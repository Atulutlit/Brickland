const cartRoutes = require("express").Router();
const { jwtCustomerVerify } = require("../../../../helper/authHandler");
const {
  addProductToCart,
  removeProductFromCart,
  cartList,
  applyCouponInCart,
  removeCouponInCart,
  increaseProductQuantity,
  decreaseProductQuantity,
} = require("../controller/cartHandler");
const {
  addProductJoiMiddleware,
  applyCouponJoiMiddleware,
} = require("../service/cartService");

cartRoutes.post(
  "/add",
  jwtCustomerVerify,
  addProductJoiMiddleware,
  addProductToCart
);
cartRoutes.post(
  "/increase",
  jwtCustomerVerify,
  addProductJoiMiddleware,
  increaseProductQuantity
);
cartRoutes.post(
  "/decrease",
  jwtCustomerVerify,
  addProductJoiMiddleware,
  decreaseProductQuantity
);
cartRoutes.delete(
  "/delete/:productId",
  jwtCustomerVerify,
  removeProductFromCart
);
cartRoutes.get("/list", jwtCustomerVerify, cartList);
cartRoutes.post(
  "/coupon/apply",
  jwtCustomerVerify,
  applyCouponJoiMiddleware,
  applyCouponInCart
);
cartRoutes.delete("/coupon/remove", jwtCustomerVerify, removeCouponInCart);

module.exports = cartRoutes;
