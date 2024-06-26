const blogsRoutes = require("express").Router();
const { blogsList, blogsDetail, addComment} = require("../controller/blogsHandler");

blogsRoutes.get("/list", blogsList);
blogsRoutes.get("/details/:id", blogsDetail);
blogsRoutes.post("/add/comment/:id", addComment);

module.exports = blogsRoutes;
