const teamRoutes = require("express").Router();
const { jwtAdminVerify } = require("../../../../helper/authHandler");
const { teamList, teamAdd, teamDelete } = require("../controller/teamHandler");

teamRoutes.get("/list", teamList);
teamRoutes.delete("/delete/:id", jwtAdminVerify , teamDelete);
teamRoutes.post("/add",teamAdd)
teamRoutes.get("/",(req,res)=>{
    res.send("Hello world team");
})

module.exports = teamRoutes;
