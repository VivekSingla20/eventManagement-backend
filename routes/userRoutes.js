const express = require("express");
const router = express.Router();
const { sendOtp, verifyOtp } = require("../controllers/userController");

const {
  authenticateUser,
  checkOtpVerified,
} = require("../middlewares/authMiddleware");
// const { getProfile } = require("../controllers/userController");

// OTP routes
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
// Protect a route with both middlewares
// router.get("/profile", authenticateUser, checkOtpVerified, getProfile);

module.exports = router;
