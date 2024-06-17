const testimonialRoutes = require("express").Router();
const { jwtAdminVerify } = require("../../../../helper/authHandler");
const { addTestimonial,testimonialList,testimonialDetail,updateTestimonial,changeStatus,deleteTestimonials,} = require("../controller/testimonialHandler");
const { testimonialsJoiMiddleware,changeStatusJoiMiddleware,} = require("../service/testimonialService");

testimonialRoutes.post("/add",jwtAdminVerify,testimonialsJoiMiddleware,addTestimonial);
testimonialRoutes.get("/list", jwtAdminVerify, testimonialList);
testimonialRoutes.get("/details/:_id", jwtAdminVerify, testimonialDetail);
testimonialRoutes.put("/update/:_id",jwtAdminVerify,testimonialsJoiMiddleware,updateTestimonial);
testimonialRoutes.put("/status",jwtAdminVerify,changeStatusJoiMiddleware,changeStatus);
testimonialRoutes.delete("/delete/:_id", jwtAdminVerify, deleteTestimonials);

module.exports = testimonialRoutes;
