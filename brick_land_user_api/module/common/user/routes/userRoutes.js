const userRoutes = require("express").Router();
const { jwtCustomerVerify } = require("../../../../helper/authHandler");
const {
  sendRegistrationOTP,
  verifyRegistrationOtp,
  updateUserInformation,
  sendLoginOtp,
  verifyLoginOtp,
  logoutUser,
  getUserProfile,
} = require("../controller/userController");
const {
  sendOTPJoiMiddleware,
  verifyOTPJoiMiddleware,
  updateUserJoiMiddleware,
} = require("../service/userService");

userRoutes.post("/send/otp", sendOTPJoiMiddleware, sendRegistrationOTP);
userRoutes.post("/verify/otp", verifyOTPJoiMiddleware, verifyRegistrationOtp);
userRoutes.post("/update", updateUserJoiMiddleware, updateUserInformation);

userRoutes.post("/login/otp", sendOTPJoiMiddleware, sendLoginOtp);
userRoutes.put("/verify/otp", verifyOTPJoiMiddleware, verifyLoginOtp);

userRoutes.get("/profile", jwtCustomerVerify, getUserProfile);
userRoutes.get("/logout", jwtCustomerVerify, logoutUser);

module.exports = userRoutes;
