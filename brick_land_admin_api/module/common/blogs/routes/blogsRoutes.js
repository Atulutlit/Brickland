const blogsRoutes = require("express").Router();
const { jwtVerify } = require("../../../../helper/authHandler");
const { uploadImagesS3 } = require("../../../../helper/comFunction");
const { accessControl } = require("../../../../helper/aclHandler");
const { modelName } = require("../model/blogsModel").blogsModel;
const {
  addBlogs,
  blogsList,
  blogsDetail,
  updateBlogs,
  changeStatus
} = require("../controller/blogsHandler");

blogsRoutes.post("/add", jwtVerify, (req, res, next) => {
  accessControl(req, res, next, modelName)
}, uploadImagesS3.single("blogsImg"), addBlogs);
blogsRoutes.get("/list", jwtVerify, (req, res, next) => {
  accessControl(req, res, next, modelName)
}, blogsList);
blogsRoutes.get("/details/:blogsId", jwtVerify, (req, res, next) => {
  accessControl(req, res, next, modelName)
}, blogsDetail);
blogsRoutes.put("/update", jwtVerify, (req, res, next) => {
  accessControl(req, res, next, modelName)
}, uploadImagesS3.single("blogsImg"), updateBlogs);
blogsRoutes.put("/status", jwtVerify, (req, res, next) => {
  accessControl(req, res, next, modelName)
}, changeStatus);

module.exports = blogsRoutes;
