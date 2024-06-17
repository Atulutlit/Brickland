const blogCategoryRoutes = require("express").Router();
const { jwtAdminVerify } = require("../../../../helper/authHandler");
const {
  addCategory,
  categoryList,
  getCategoryById,
  updateCategory,
  changeCategoryStatus,
  subCategoryList,
  deleteCategory,
} = require("../controller/categoryHandler");
const {
  addCategoryJoiMiddleware,
  updateCategoryJoiMiddleware,
  changeCategoryStatusJoiMiddleware,
} = require("../service/categoryService");

blogCategoryRoutes.post(
  "/add",
  jwtAdminVerify,
  addCategoryJoiMiddleware,
  addCategory
);
blogCategoryRoutes.get("/list", jwtAdminVerify, categoryList);
blogCategoryRoutes.get("/details/:_id", jwtAdminVerify, getCategoryById);
blogCategoryRoutes.get("/subcategory/list", jwtAdminVerify, subCategoryList);
blogCategoryRoutes.put(
  "/update",
  jwtAdminVerify,
  updateCategoryJoiMiddleware,
  updateCategory
);
blogCategoryRoutes.put(
  "/status",
  jwtAdminVerify,
  changeCategoryStatusJoiMiddleware,
  changeCategoryStatus
);
blogCategoryRoutes.delete("/delete/:_id", jwtAdminVerify, deleteCategory);

module.exports = blogCategoryRoutes;
