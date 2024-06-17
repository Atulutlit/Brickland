const faqRoutes = require("express").Router();
const { jwtCustomerVerify } = require("../../../../helper/authHandler");
const { faqList, faqDetail } = require("../controller/faqHandler");

faqRoutes.get("/list", jwtCustomerVerify, faqList);
faqRoutes.get("/details/:_id", jwtCustomerVerify, faqDetail);

module.exports = faqRoutes;
