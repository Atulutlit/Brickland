const pageRoutes = require("express").Router();
const { jwtAdminVerify } = require("../../../../helper/authHandler");
const {
  addPage,
  pageList,
  pageDetail,
  updatePage,
  changeStatus,
  deletePage,
} = require("../controller/staticPageHandler");
const {
  staticPageJoiMiddleware,
  changeStatusJoiMiddleware,
} = require("../service/staticPageService");

pageRoutes.post("/add", jwtAdminVerify, staticPageJoiMiddleware, addPage);
pageRoutes.get("/list", jwtAdminVerify, pageList);
pageRoutes.get("/details/:_id", jwtAdminVerify, pageDetail);
pageRoutes.put(
  "/update/:_id",
  jwtAdminVerify,
  staticPageJoiMiddleware,
  updatePage
);
pageRoutes.put(
  "/status",
  jwtAdminVerify,
  changeStatusJoiMiddleware,
  changeStatus
);
pageRoutes.delete("/delete/:_id", jwtAdminVerify, deletePage);

module.exports = pageRoutes;
