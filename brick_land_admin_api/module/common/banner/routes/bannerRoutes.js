const bannerRoutes = require("express").Router();
const { jwtAdminVerify } = require("../../../../helper/authHandler");
const { bannerList, bannerDetail,bannerAdd,bannerDelete,bannerUpdate } = require("../controller/bannerHandler");

bannerRoutes.get("/list", bannerList);
bannerRoutes.get("/details/:_id", jwtAdminVerify , bannerDetail);
bannerRoutes.post("/add",jwtAdminVerify,bannerAdd)
bannerRoutes.put("/update/:id",bannerUpdate);
bannerRoutes.delete("/delete/:id",jwtAdminVerify,bannerDelete)
bannerRoutes.get("/",(req,res)=>{
    res.send("Hello world banner");
})

module.exports = bannerRoutes;
