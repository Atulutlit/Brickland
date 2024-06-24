const careerRoutes = require("express").Router();
const { jwtAdminVerify } = require("../../../../helper/authHandler");
const { careerList,careerDetail,careerAdd,removeCareer,careerUpdate } = require("../controller/controllerHandler");

careerRoutes.get("/list",jwtAdminVerify, careerList);
careerRoutes.get("/details/:_id", jwtAdminVerify , careerDetail);
careerRoutes.post("/add",jwtAdminVerify,careerAdd);
careerRoutes.delete("/delete/:id",jwtAdminVerify,removeCareer);
careerRoutes.put('/update/:id',jwtAdminVerify,careerUpdate)

careerRoutes.get("/",(req,res)=>{
    res.send("Career Routes working");
})

module.exports = careerRoutes;
