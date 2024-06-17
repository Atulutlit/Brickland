const faqRoutes = require("express").Router();
const { jwtAdminVerify } = require("../../../../helper/authHandler");
const { addFaq, faqList, faqDetail, updateFaq, changeStatus, deleteFaq,} = require("../controller/faqHandler");
const { faqJoiMiddleware } = require("../service/faqService");

faqRoutes.post("/add", jwtAdminVerify, faqJoiMiddleware, addFaq);
faqRoutes.get("/list", jwtAdminVerify, faqList);
faqRoutes.get("/details/:_id", jwtAdminVerify, faqDetail);
faqRoutes.put("/update/:_id", jwtAdminVerify, faqJoiMiddleware, updateFaq);
faqRoutes.put("/status", jwtAdminVerify, changeStatus);
faqRoutes.delete("/delete/:_id", jwtAdminVerify, deleteFaq);

module.exports = faqRoutes;
