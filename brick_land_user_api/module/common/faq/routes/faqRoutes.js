const faqRoutes = require("express").Router();
const { jwtCustomerVerify } = require("../../../../helper/authHandler");
const { faqList, faqDetail } = require("../controller/faqHandler");

faqRoutes.get("/list", faqList);

module.exports = faqRoutes;
