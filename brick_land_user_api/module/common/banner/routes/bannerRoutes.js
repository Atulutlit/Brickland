const bannerRoutes = require("express").Router();
const { bannerList } = require("../controller/bannerHandler");

bannerRoutes.get("/list", bannerList);

module.exports = bannerRoutes;
