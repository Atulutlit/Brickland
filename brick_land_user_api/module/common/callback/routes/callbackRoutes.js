const callbackRoutes = require("express").Router();
const { jwtCustomerVerify } = require("../../../../helper/authHandler");
const { addCallback } = require("../controller/callbackHandler");
const { addCallBackJoiMiddleware } = require("../service/callbackService");

// callbackRoutes.post(
//   "/add",
//   jwtCustomerVerify,
//   addCallBackJoiMiddleware,
//   addCallback
// );
callbackRoutes.post("/add",addCallback);

module.exports = callbackRoutes;
