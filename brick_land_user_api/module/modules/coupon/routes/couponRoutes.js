const couponRoutes = require("express").Router();
const { jwtCustomerVerify } = require("../../../../helper/authHandler");
const { couponList, couponDetail } = require("../controller/couponHandler");

couponRoutes.get("/list", jwtCustomerVerify, couponList);
couponRoutes.get("/details/:_id", jwtCustomerVerify, couponDetail);

module.exports = couponRoutes;
