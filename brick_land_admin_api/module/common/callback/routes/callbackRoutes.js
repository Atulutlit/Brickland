const callbackRoutes = require("express").Router();
const { jwtAdminVerify } = require("../../../../helper/authHandler");
const {
  callbackList,
  callbackDetail,
  changeStatus,
  deletecallback,
} = require("../controller/callbackHandler");
const { changeStatusJoiMiddleware } = require("../service/callbackService");

callbackRoutes.get("/list", jwtAdminVerify, callbackList);
callbackRoutes.get("/details/:_id", jwtAdminVerify, callbackDetail);
callbackRoutes.put(
  "/status",
  jwtAdminVerify,
  changeStatusJoiMiddleware,
  changeStatus
);
callbackRoutes.delete("/delete/:_id", jwtAdminVerify, deletecallback);

module.exports = callbackRoutes;
