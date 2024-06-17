const userRoutes = require("express").Router();
const { jwtAdminVerify } = require("../../../../helper/authHandler");
const { userList,userDetail,changeStatus } = require("../controller/userController");
const { changeStatusJoiMiddleware } = require("../service/userService");

userRoutes.get("/list", jwtAdminVerify, userList);
userRoutes.get("/details/:_id", jwtAdminVerify, userDetail);
userRoutes.put("/status",jwtAdminVerify,changeStatusJoiMiddleware,changeStatus);

module.exports = userRoutes;
