const propertyRoutes = require("express").Router();
const { propertyList, propertyDetail } = require("../controller/propertyHandler");

propertyRoutes.get("/list",  propertyList);
propertyRoutes.get("/details/:_id", propertyDetail);

module.exports = propertyRoutes;
