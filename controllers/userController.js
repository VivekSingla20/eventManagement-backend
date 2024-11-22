const { log } = require("console");
const { User } = require("../models");
const { sendOtpEmail } = require("../utils/EmailService");
const crypto = require("crypto");

// Function to generate OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate OTP
    const otp = generateOtp();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // Expires in 10 minutes

    // Update user with OTP and expiration
    await user.update({ otp, otpExpires });

    // Send OTP via email
    await sendOtpEmail(email, otp);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending OTP" });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check OTP and expiration
    if (user.otp !== otp || new Date() > new Date(user.otpExpires)) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Clear OTP fields after successful verification
    await user.update({ otp: null, otpExpires: null });

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error verifying OTP" });
  }
};
