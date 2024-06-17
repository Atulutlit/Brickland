const productRoutes = require("express").Router();
const { jwtAdminVerify } = require("../../../../helper/authHandler");
const {
  addProduct,
  productList,
  productDetails,
  updateProduct,
  changeStatus,
  deleteProduct,
  changeState,
  addProductStock,
  removeProductStock,
} = require("../controller/productHandler");
const {
  productJoiMiddleware,
  changeStatusJoiMiddleware,
  changeStateJoiMiddleware,
  addStockJoiMiddleware,
} = require("../service/productService");

productRoutes.post("/add", jwtAdminVerify, productJoiMiddleware, addProduct);
productRoutes.get("/list", jwtAdminVerify, productList);
productRoutes.get("/details/:_id", jwtAdminVerify, productDetails);
productRoutes.put(
  "/update/:_id",
  jwtAdminVerify,
  productJoiMiddleware,
  updateProduct
);
productRoutes.put(
  "/status",
  jwtAdminVerify,
  changeStatusJoiMiddleware,
  changeStatus
);
productRoutes.put(
  "/state",
  jwtAdminVerify,
  changeStateJoiMiddleware,
  changeState
);
productRoutes.delete("/delete/:_id", jwtAdminVerify, deleteProduct);
productRoutes.put(
  "/stock",
  addStockJoiMiddleware,
  jwtAdminVerify,
  addProductStock
);
productRoutes.delete("/stock/:_id", jwtAdminVerify, removeProductStock);

module.exports = productRoutes;
