const pageRoutes = require("express").Router();
const { jwtVerify } = require("../../../../helper/authHandler");
const {
  pageList,
  pageDetails,
  pageDetailsByUrl,
} = require("../controller/staticPageHandler");

pageRoutes.get("/list", pageList);
pageRoutes.get("/details/:_id", pageDetails);
pageRoutes.get("/details/url/:url", pageDetailsByUrl);

module.exports = pageRoutes;
