"use strict";
const { Types } = require("mongoose");
const { userModel } = require("../model/userModel");
const { getCustomUserId } = require("../../counter/controller/counterHandler");
const { jwtToken } = require("../../../../helper/comFunction");

const sendRegistrationOTP = async (req, res) => {
  try {
    const { mobile } = req.body;
    const findUser = await userModel.findOne({
      mobile,
      otpVerified: true,
    });
    if (findUser) {
      if (!findUser.isProfileComplete) {
        return res.json({
          meta: { msg: "please complete your profile", status: false },
          data: { isProfileComplete: false, _id: findUser._id },
        });
      } else {
        return res.json({
          meta: {
            msg: "User exist with this mobile number. please login",
            status: false,
          },
        });
      }
    } else {
      const findUserAgain = await userModel.findOne({ mobile });
      if (findUserAgain) {
        // const mobileOtp = await randomFixedInteger(6);
        const mobileOtp = "123456";
        const updateQuery = {
          mobileOtp,
          isMobileOtpValid: true,
        };
        const updateUser = await userModel.findByIdAndUpdate(
          new Types.ObjectId(findUserAgain._id),
          { $set: updateQuery },
          { new: true }
        );
        if (updateUser) {
          // send sms to the user
          return res.json({
            meta: { msg: "OTP send successfully.", status: true },
          });
        } else {
          return res.json({
            meta: { msg: "Something went wrong.", status: false },
          });
        }
      } else {
        // const mobileOtp = await randomFixedInteger(6);
        const mobileOtp = "123456";
        const userId = await getCustomUserId();
        const userData = {
          mobile,
          mobileOtp,
          isMobileOtpValid: true,
          userId,
        };
        const userCreated = await userModel.create(userData);
        if (userCreated) {
          // send sms to the user
          return res.json({
            meta: { msg: "OTP send successfully.", status: true },
          });
        } else {
          return res.json({
            meta: { msg: "Something went wrong.", status: false },
          });
        }
      }
    }
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

const verifyRegistrationOtp = async (req, res) => {
  try {
    const { mobile, otp } = req.body;
    const findQuery = {
      mobile,
      mobileOtp: Number(otp),
      otpVerified: false,
      isMobileOtpValid: true,
    };
    const updateQuery = {
      otpVerified: true,
      mobileOtp: null,
      isMobileOtpValid: false,
    };
    const matchOtp = await userModel.findOneAndUpdate(
      findQuery,
      { $set: updateQuery },
      { new: true }
    );
    if (matchOtp) {
      return res.json({
        meta: { msg: "Mobile OTP verified successfully.", status: true },
        data: { _id: matchOtp._id },
      });
    } else {
      return res.json({
        meta: { msg: "OTP does not match.", status: false },
      });
    }
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

const updateUserInformation = async function (req, res) {
  try {
    const {
      _id,
      mobile,
      name,
      email,
      country,
      state,
      district,
      city,
      pincode,
      address,
    } = req.body;

    const findQuery = {
      _id: new Types.ObjectId(_id),
      mobile,
      isProfileComplete: false,
      otpVerified: true,
    };
    const updateQuery = {
      name,
      email,
      country,
      state,
      district,
      city,
      pincode,
      address,
      isProfileComplete: true,
    };
    const updateUser = await userModel.findOneAndUpdate(findQuery, {
      $set: updateQuery,
    });
    if (updateUser) {
      return res.json({
        meta: { msg: "User profile updated successfully", status: true },
      });
    } else {
      return res.json({
        meta: { msg: "Something went wrong.", status: false },
      });
    }
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

const sendLoginOtp = async (req, res) => {
  try {
    const { mobile } = req.body;
    const findUser = await userModel.findOne({
      mobile,
      otpVerified: true,
      isProfileComplete: true,
      status: "ACTIVE",
    });
    if (findUser) {
      // const mobileOtp = await randomFixedInteger(6);
      const mobileOtp = "123456";
      const updateQuery = {
        mobileOtp,
        isMobileLoginOtpValid: true,
      };
      const updateUser = await userModel.findByIdAndUpdate(
        new Types.ObjectId(findUser._id),
        { $set: updateQuery },
        { new: true }
      );
      if (updateUser) {
        // send sms to the user
        return res.json({
          meta: { msg: "OTP send successfully.", status: true },
        });
      } else {
        return res.json({
          meta: { msg: "Something went wrong.", status: false },
        });
      }
    } else {
      return res.json({
        meta: { msg: "User Not found", status: false },
        data: {
          userExists: false,
        },
      });
    }
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

const verifyLoginOtp = async (req, res) => {
  try {
    const { mobile, otp } = req.body;
    const findQuery = {
      mobile,
      mobileOtp: Number(otp),
      otpVerified: true,
      isMobileLoginOtpValid: true,
    };
    const updateQuery = {
      mobileOtp: null,
      isMobileLoginOtpValid: false,
      isLogin: true,
    };
    const matchOtp = await userModel.findOneAndUpdate(
      findQuery,
      { $set: updateQuery },
      { new: true }
    );
    if (matchOtp) {
      const token = await jwtToken({
        _id: matchOtp._id,
        mobile: matchOtp.mobile,
      });
      return res.json({
        meta: { msg: "Mobile OTP verified successfully.", status: true },
        token,
      });
    } else {
      return res.json({
        meta: { msg: "OTP does not match.", status: false },
      });
    }
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

const logoutUser = async function (req, res) {
  try {
    const { _id } = req.decoded;
    const logOutUser = await userModel.findOneAndUpdate(
      { _id: Types.ObjectId(_id) },
      { $set: { isLogin: false } }
    );
    if (logOutUser) {
      return res.json({
        meta: { msg: "User logout successfully", status: true },
      });
    } else {
      return res.json({
        meta: { msg: "Something went wrong.", status: false },
      });
    }
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

const getUserProfile = async function (req, res) {
  try {
    const { _id } = req.decoded;
    const profileData = await userModel
      .findOne({ _id: new Types.ObjectId(_id) })
      .select(
        "-coordinates -deviceToken -isLogin -isProfileComplete -otpVerified -isMobileOtpValid -isMobileLoginOtpValid -mobileOtp"
      );
    // const cartCount = await cartModel.countDocuments({
    //   userId: Types.ObjectId(userId),
    // });
    if (profileData) {
      return res.json({
        meta: { msg: "Profile data found successfully", status: true },
        data: profileData,
        // cartCount
      });
    } else {
      return res.json({
        meta: { msg: "Something went wrong.", status: false },
      });
    }
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

module.exports = {
  sendRegistrationOTP,
  verifyRegistrationOtp,
  updateUserInformation,
  sendLoginOtp,
  verifyLoginOtp,
  logoutUser,
  getUserProfile,
};
