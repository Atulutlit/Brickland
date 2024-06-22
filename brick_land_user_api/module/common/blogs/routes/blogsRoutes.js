const blogsRoutes = require("express").Router();
const { blogsList, blogsDetail} = require("../controller/blogsHandler");

blogsRoutes.get("/list", blogsList);
blogsRoutes.get("/details/:_id", blogsDetail);

module.exports = blogsRoutes;
