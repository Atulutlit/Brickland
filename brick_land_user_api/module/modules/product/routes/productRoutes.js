const productRoutes = require("express").Router();
const { jwtCustomerVerify } = require("../../../../helper/authHandler");
const { productList, productDetails } = require("../controller/productHandler");

productRoutes.get("/list", jwtCustomerVerify, productList);
productRoutes.get("/details/:productId", jwtCustomerVerify, productDetails);

module.exports = productRoutes;
