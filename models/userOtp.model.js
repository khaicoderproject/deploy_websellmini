const mongoose = require("mongoose");
const userOtpSchema = new mongoose.Schema(
  {
    email: String,
    otp: Number,
    expireAt: {
      type: Date,
      default: Date.now,
      expires: 300,
    },
  },
  {
    timestamps: true,
  }
);
const userOtp = mongoose.model("userOtp", userOtpSchema, "userOtp");

module.exports = userOtp;
