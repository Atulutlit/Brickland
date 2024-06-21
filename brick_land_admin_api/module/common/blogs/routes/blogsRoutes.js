const blogsRoutes = require("express").Router();
const { jwtAdminVerify } = require("../../../../helper/authHandler");
const { blogsList, blogsDetail,blogsAdd,blogsDelete,blogsUpdate } = require("../controller/blogsHandler");

blogsRoutes.get("/list", bannerList);
blogsRoutes.get("/details/:_id", jwtAdminVerify , bannerDetail);
blogsRoutes.post("/add",jwtAdminVerify,blogsAdd)
blogsRoutes.put("/update/:id",blogsUpdate);
blogsRoutes.delete("/delete/:id",jwtAdminVerify,blogsDelete)
blogsRoutes.get("/",(req,res)=>{
    res.send("Hello world blogs");
})

module.exports = blogsRoutes;
