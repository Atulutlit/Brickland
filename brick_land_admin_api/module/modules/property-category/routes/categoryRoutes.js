const propertyCategoryRoutes = require("express").Router();
const { jwtAdminVerify } = require("../../../../helper/authHandler");
const { addCategory, categoryList, getCategoryById, updateCategory, changeCategoryStatus, subCategoryList, deleteCategory} = require("../controller/categoryHandler");
const { addCategoryJoiMiddleware, updateCategoryJoiMiddleware,changeCategoryStatusJoiMiddleware} = require("../service/categoryService");

// propertyCategoryRoutes.post("/add",jwtAdminVerify,addCategoryJoiMiddleware,addCategory);
propertyCategoryRoutes.post("/add",jwtAdminVerify,addCategory);
propertyCategoryRoutes.get("/list", jwtAdminVerify, categoryList);
propertyCategoryRoutes.get("/details/:_id", jwtAdminVerify, getCategoryById);
propertyCategoryRoutes.get("/subcategory/list", jwtAdminVerify, subCategoryList);
propertyCategoryRoutes.put("/update",jwtAdminVerify,updateCategoryJoiMiddleware,updateCategory);
propertyCategoryRoutes.put("/status",jwtAdminVerify,changeCategoryStatusJoiMiddleware,changeCategoryStatus);
propertyCategoryRoutes.delete("/delete/:_id", jwtAdminVerify, deleteCategory);

module.exports = propertyCategoryRoutes;
