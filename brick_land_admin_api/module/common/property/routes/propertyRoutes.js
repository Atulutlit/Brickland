const propertyRoutes = require("express").Router();
const { jwtAdminVerify } = require("../../../../helper/authHandler");
const { propertyList, propertyDetail,addProperty,deleteProperty,updateProperty } = require("../controller/propertyHandler");

propertyRoutes.get("/list", jwtAdminVerify , propertyList);
propertyRoutes.get("/details/:_id", jwtAdminVerify , propertyDetail);
propertyRoutes.post("/add", jwtAdminVerify, addProperty);
propertyRoutes.delete("/delete/:id", jwtAdminVerify, deleteProperty);
propertyRoutes.put("/update/:id", jwtAdminVerify, updateProperty);
propertyRoutes.get("/",(req,res)=>{
    res.send("Hello world property");
})

module.exports = propertyRoutes;
