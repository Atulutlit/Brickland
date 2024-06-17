const addressRoutes = require("express").Router();
const { jwtCustomerVerify } = require("../../../../helper/authHandler");
const {
  addAddress,
  addressList,
  addressDetail,
  updateAddress,
  deleteAddress,
  changeDefault,
} = require("../controller/addressHandler");
const { addressJoiMiddleware } = require("../services/addressService");

addressRoutes.post("/add", jwtCustomerVerify, addressJoiMiddleware, addAddress);
addressRoutes.get("/list", jwtCustomerVerify, addressList);
addressRoutes.get("/details/:addressId", jwtCustomerVerify, addressDetail);
addressRoutes.put(
  "/update/:addressId",
  jwtCustomerVerify,
  addressJoiMiddleware,
  updateAddress
);
addressRoutes.delete("/delete/:addressId", jwtCustomerVerify, deleteAddress);
addressRoutes.put("/default/:addressId", jwtCustomerVerify, changeDefault);

module.exports = addressRoutes;
