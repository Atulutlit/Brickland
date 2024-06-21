const contactInfoRoutes = require("express").Router();
const { contactInfoDetail } = require("../controller/contactInfoHandler");

contactInfoRoutes.get("/detail",contactInfoDetail);

module.exports = contactInfoRoutes;
