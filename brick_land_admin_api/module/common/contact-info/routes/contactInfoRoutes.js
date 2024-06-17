const contactInfoRoutes = require("express").Router();
const { jwtAdminVerify } = require("../../../../helper/authHandler");
// const { accessControl } = require("../../../../helper/aclHandler");
const { modelName } = require("../model/contactInfoModel").contactInfoModel;
const {
    addContactInfo,
    contactInfoDetail,
} = require("../controller/contactInfoHandler");

contactInfoRoutes.post("/add", jwtAdminVerify, addContactInfo);
contactInfoRoutes.get("/details", jwtAdminVerify, contactInfoDetail);

contactInfoRoutes.get("/",(req,res)=>{
    res.send("contact infor routes");
})

module.exports = contactInfoRoutes;