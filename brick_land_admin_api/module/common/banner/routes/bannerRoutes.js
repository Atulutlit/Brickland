const bannerRoutes = require("express").Router();
const { jwtAdminVerify } = require("../../../../helper/authHandler");
const { bannerList, bannerDetail,bannerAdd } = require("../controller/bannerHandler");

bannerRoutes.get("/list", bannerList);
bannerRoutes.get("/details/:_id", jwtAdminVerify , bannerDetail);
bannerRoutes.post("/add",jwtAdminVerify,bannerAdd)
bannerRoutes.get("/",(req,res)=>{
    res.send("Hello world banner");
})

module.exports = bannerRoutes;
