const careerRoutes = require("express").Router();
const { jwtAdminVerify } = require("../../../../helper/authHandler");
const { careerList,careerDetail,careerAdd,removeCareer } = require("../controller/controllerHandler");

careerRoutes.get("/list", careerList);
careerRoutes.get("/details/:_id", jwtAdminVerify , careerDetail);
careerRoutes.post("/add",careerAdd);
careerRoutes.delete("/delete/:id",removeCareer);

careerRoutes.get("/",(req,res)=>{
    res.send("Career Routes working");
})

module.exports = careerRoutes;
