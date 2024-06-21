const teamRoutes = require("express").Router();
const { teamList } = require("../controller/teamHandler");

teamRoutes.get("/list", teamList);


module.exports = teamRoutes;
