const careerRoutes = require("express").Router();
const { careerList,careerDetail } = require("../controller/controllerHandler");

careerRoutes.get("/list", careerList);
careerRoutes.get("/details/:_id", careerDetail);


module.exports = careerRoutes;
