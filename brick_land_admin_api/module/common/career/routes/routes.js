const careerRoutes = require("express").Router();
const { jwtAdminVerify } = require("../../../../helper/authHandler");
const { careerList,careerDetail,careerAdd,removeCareer } = require("../controller/controllerHandler");

careerRoutes.get("/list",jwtAdminVerify, careerList);
careerRoutes.get("/details/:_id", jwtAdminVerify , careerDetail);
careerRoutes.post("/add",jwtAdminVerify,careerAdd);
careerRoutes.delete("/delete/:id",jwtAdminVerify,removeCareer);

careerRoutes.get("/",(req,res)=>{
    res.send("Career Routes working");
})

module.exports = careerRoutes;
