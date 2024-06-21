const blogsRoutes = require("express").Router();
const { blogsList, blogsDetail} = require("../controller/blogsHandler");

blogsRoutes.get("/list", bannerList);
blogsRoutes.get("/details/:_id", bannerDetail);

module.exports = blogsRoutes;
