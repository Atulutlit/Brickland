"use strict";
const { Types } = require("mongoose");
const { adminModel } = require("../model/adminModel");
const { jwtToken, randomFixedInteger } = require("../../../helper/comFunction");
const md5 = require("md5");

const login = async function (req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        meta: { msg: "Parameter missing", status: false },
      });
    }
    const admin = await adminModel.findOne({ email });
    if (!admin || admin === null) {
      return res.json({
        meta: { msg: "Admin not registered", status: false },
      });
    }
    if (admin.password !== md5(password)) {
      return res.json({
        meta: { msg: "Incorrect email or password", status: false },
      });
    }
    const token = await jwtToken({
      email: admin.email,
      _id: admin._id,
      adminType: admin.adminType,
    });
    const updateAdmin = await adminModel.findOneAndUpdate(
      { email },
      { $set: { isLogin: true } },
      { new: true }
    );
    if (updateAdmin) {
      return res.json({
        meta: { msg: "Admin login successfully.", status: true },
        token,
      });
    } else {
      return res.json({
        meta: { msg: "Something went wrong.", status: false },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      meta: { msg: error.message, status: false },
    });
  }
};

const getAdminProfile = async function (req, res) {
  try {
    const { _id } = req.decoded;
    const getAdminProfile = await adminModel
      .findOne({ _id: new Types.ObjectId(_id) })
      .select("-password");
    if (getAdminProfile) {
      return res.json({
        meta: { msg: "Admin profile found successfully", status: true },
        data: getAdminProfile,
      });
    } else {
      return res.json({
        meta: { msg: "Admin not found", status: false },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      meta: { msg: error.message, status: false },
    });
  }
};

const logout = async function (req, res) {
  try {
    const { _id } = req.decoded;
    const logOutAdmin = await adminModel.findOneAndUpdate(
      { _id: new Types.ObjectId(_id) },
      { $set: { isLogin: false } }
    );
    if (logOutAdmin) {
      return res.json({
        meta: { msg: "Admin logout successfully", status: true },
      });
    } else {
      return res.json({
        meta: { msg: "Something went wrong.", status: false },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      meta: { msg: error.message, status: false },
    });
  }
};

const resetAdminPassword = async (req, res) => {
  try {
    const { _id } = req.decoded;
    const { oldPassword, newPassword } = req.body;
    const findAdmin = await adminModel.findById(new Types.ObjectId(_id));
    if (!findAdmin) {
      return res.json({
        meta: { msg: "Admin not found", status: false },
      });
    }
    if (findAdmin.password !== md5(oldPassword)) {
      return res.json({
        meta: { msg: "Old password does not match", status: false },
      });
    }
    if (findAdmin.password == md5(newPassword)) {
      return res.json({
        meta: {
          msg: "New password can not be same as old password",
          status: false,
        },
      });
    }
    let updateAdminPassword = await findAdmin.updateOne({
      $set: { password: md5(newPassword) },
    });
    if (updateAdminPassword.modifiedCount == 1) {
      return res.json({
        meta: { msg: "Password reset successfully", status: true },
      });
    } else {
      return res.json({
        meta: { msg: "Something went wrong", status: false },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      meta: { msg: error.message, status: false },
    });
  }
};

module.exports = {
  login,
  getAdminProfile,
  logout,
  resetAdminPassword,
};
