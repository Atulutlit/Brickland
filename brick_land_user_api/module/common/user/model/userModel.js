const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, index: true, unique: true, required: true },
    name: { type: String, index: true },
    email: { type: String, index: true },
    country: { type: String, index: true },
    state: { type: String, index: true },
    district: { type: String, index: true },
    city: { type: String, index: true },
    pincode: { type: String, index: true },
    address: { type: String, index: true },

    dob: { type: Number },
    mobile: { type: Number, index: true, unique: true, required: true },
    mobileOtp: { type: Number },
    isMobileLoginOtpValid: { type: Boolean, default: false },
    isMobileOtpValid: { type: Boolean, default: false },
    otpVerified: { type: Boolean, default: false },
    isProfileComplete: { type: Boolean, default: false },
    isLogin: { type: Boolean, default: false },
    profileImg: { type: String },
    gender: { type: String },
    status: {
      type: String,
      enum: ["ACTIVE", "DEACTIVE"],
      default: "ACTIVE",
    },
    deviceToken: { type: String },
    // In first place latitude and In second place longitute
    coordinates: [{ type: Number }],

    ratings: { type: Number, default: 0 },

    createdAt: Number,
    updatedAt: Number,
  },
  { timestamps: true }
);

userSchema.index({ coordinates: "2dsphere" });
const userModel = mongoose.model("users", userSchema);

module.exports = { userModel };
