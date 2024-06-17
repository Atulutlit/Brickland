const categoryRoutes = require("express").Router();
const { jwtCustomerVerify } = require("../../../../helper/authHandler");
const {
  categoryList,
  getCategoryById,
  subCategoryList,
} = require("../controller/categoryHandler");

categoryRoutes.get("/list", jwtCustomerVerify, categoryList);
categoryRoutes.get("/details/:_id", jwtCustomerVerify, getCategoryById);
categoryRoutes.get(
  "/subcategory/list/:_id",
  jwtCustomerVerify,
  subCategoryList
);

module.exports = categoryRoutes;
