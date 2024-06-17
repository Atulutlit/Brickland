const bannerRoutes = require("express").Router();
const { jwtCustomerVerify } = require("../../../../helper/authHandler");
const { bannerList, bannerDetail } = require("../controller/bannerHandler");

bannerRoutes.get("/list", jwtCustomerVerify, bannerList);
bannerRoutes.get("/details/:_id", jwtCustomerVerify, bannerDetail);

module.exports = bannerRoutes;
