const adminRoutes = require("express").Router();
const { jwtAdminVerify } = require("../../../helper/authHandler");
const {
  login,
  getAdminProfile,
  logout,
  resetAdminPassword,
} = require("../controller/adminController");

const {
  adminLogin,
  resetAdminPasswordJoiMiddleware,
} = require("../service/adminService");

adminRoutes.post("/login", adminLogin, login);
adminRoutes.get("/profile", jwtAdminVerify, getAdminProfile);
adminRoutes.put("/logout", jwtAdminVerify, logout);
adminRoutes.put(
  "/reset/password",
  jwtAdminVerify,
  resetAdminPasswordJoiMiddleware,
  resetAdminPassword
);

module.exports = adminRoutes;
