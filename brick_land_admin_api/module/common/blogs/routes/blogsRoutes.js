const blogsRoutes = require("express").Router();
const { jwtAdminVerify } = require("../../../../helper/authHandler");
const { blogsList, blogsDetail,blogsAdd,blogsDelete,blogsUpdate} = require("../controller/blogsHandler");

blogsRoutes.get("/list",jwtAdminVerify, blogsList);
blogsRoutes.get("/details/:_id", jwtAdminVerify , blogsDetail);
blogsRoutes.post("/add",jwtAdminVerify,blogsAdd);
blogsRoutes.put("/update/:id",jwtAdminVerify,blogsUpdate);
blogsRoutes.delete("/delete/:id",jwtAdminVerify,blogsDelete)

module.exports = blogsRoutes;
