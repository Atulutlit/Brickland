const testimonialRoutes = require("express").Router();
const {
  testimonialList,
  testimonialDetail,
} = require("../controller/testimonialHandler");

testimonialRoutes.get("/list", testimonialList);
testimonialRoutes.get("/details/:_id", testimonialDetail);

module.exports = testimonialRoutes;
