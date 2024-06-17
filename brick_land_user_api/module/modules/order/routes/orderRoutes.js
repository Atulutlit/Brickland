const orderRoutes = require("express").Router();
const { checkValidOrder } = require("../controller/OrderMiddleWare");
const { jwtCustomerVerify } = require("../../../../helper/authHandler");
const {
  orderPlace,
  orderList,
  orderDetails,
  cancelOrder,
} = require("../controller/orderHandler");
const { orderJoiMiddleware } = require("../service/orderService");

orderRoutes.post(
  "/create",
  jwtCustomerVerify,
  orderJoiMiddleware,
  checkValidOrder,
  orderPlace
);
orderRoutes.get("/list", jwtCustomerVerify, orderList);
orderRoutes.get("/details/:orderId", jwtCustomerVerify, orderDetails);
orderRoutes.put("/cancel", jwtCustomerVerify, cancelOrder);

module.exports = orderRoutes;
