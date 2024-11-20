const jwt = require("jsonwebtoken");
require("dotenv").config();

const { User } = require("../models");

// Middleware to check if the user is authenticated (basic JWT authentication)
exports.authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decodedToken.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

// Middleware to check if the user's OTP is verified
exports.checkOtpVerified = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Fetch the user from the database
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if OTP is not null or expired
    if (user.otp || new Date() < new Date(user.otpExpires)) {
      return res.status(403).json({ message: "OTP verification required" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) return res.status(403).json({ error: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(500).json({ error: "Failed to authenticate token" });

    req.userId = decoded.userId;
    next();
  });
};
