const eventCategoryRoutes = require("express").Router();
const { jwtAdminVerify } = require("../../../../helper/authHandler");
const { addCategory, categoryList, getCategoryById, updateCategory, changeCategoryStatus, subCategoryList, deleteCategory} = require("../controller/categoryHandler");
const { addCategoryJoiMiddleware, updateCategoryJoiMiddleware,changeCategoryStatusJoiMiddleware} = require("../service/categoryService");

eventCategoryRoutes.post("/add",jwtAdminVerify,addCategoryJoiMiddleware,addCategory);
eventCategoryRoutes.get("/list", jwtAdminVerify, categoryList);
eventCategoryRoutes.get("/details/:_id", jwtAdminVerify, getCategoryById);
eventCategoryRoutes.get("/subcategory/list", jwtAdminVerify, subCategoryList);
eventCategoryRoutes.put("/update",jwtAdminVerify,updateCategoryJoiMiddleware,updateCategory);
eventCategoryRoutes.put("/status",jwtAdminVerify,changeCategoryStatusJoiMiddleware,changeCategoryStatus);
eventCategoryRoutes.delete("/delete/:_id", jwtAdminVerify, deleteCategory);

module.exports = eventCategoryRoutes;
