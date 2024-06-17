"use strict";
const { Types } = require("mongoose");
const { userAddressModel } = require("../model/addressModel");
const {
  getCustomAddressId,
} = require("../../../common/counter/controller/counterHandler");

const addAddress = async function (req, res) {
  try {
    const { _id } = req.decoded;
    const {
      name,
      addressType,
      mobile,
      pincode,
      addressLine1,
      addressLine2,
      cityName,
      stateName,
      countryName,
      isDefault,
    } = req.body;
    const addressId = await getCustomAddressId();
    const addObj = {
      userId: _id,
      mobile,
      addressType: addressType.toUpperCase(),
      name,
      addressId,
      pincode,
      addressLine1,
      addressLine2,
      cityName,
      stateName,
      countryName,
      isDefault,
    };
    if (isDefault === true) {
      await userAddressModel.updateMany(
        { userId: new Types.ObjectId(_id) },
        { $set: { isDefault: false } }
      );
    }
    const addData = await userAddressModel.create(addObj);
    if (addData) {
      const findAddress = await userAddressModel.find({
        userId: new Types.ObjectId(_id),
        addressType: addressType.toUpperCase(),
      });
      if (findAddress && findAddress.length == 1) {
        await findAddress[0].updateOne({ $set: { isDefault: true } });
      }
      return res.json({
        meta: { msg: "User address added Successfully.", status: true },
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

const addressList = async (req, res) => {
  try {
    const { _id } = req.decoded;
    let { addressType } = req.query;
    let page = Number(req.query.page || 0);
    let contentPerPage = Number(req.query.contentPerPage || 0);
    const findQuery = {
      userId: new Types.ObjectId(_id),
      ...(addressType && { addressType: addressType.toUpperCase() }),
    };
    const listData = await userAddressModel
      .find(findQuery)
      .sort({ createdAt: -1 })
      .skip(contentPerPage * page - contentPerPage)
      .limit(contentPerPage);
    if (listData.length) {
      const total = await userAddressModel.countDocuments(findQuery);
      return res.json({
        meta: { msg: "Address list found.", status: true },
        data: listData,
        ...(contentPerPage && {
          pages: Math.ceil(total / contentPerPage),
          total,
        }),
      });
    } else {
      return res.json({
        meta: { msg: "Data not found.", status: false },
      });
    }
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

const addressDetail = async (req, res) => {
  try {
    const { _id } = req.decoded;
    const { addressId } = req.params;
    if (!addressId) {
      return res.json({
        meta: { msg: "Parameter missing.", status: false },
      });
    }
    const detailData = await userAddressModel.findOne({
      _id: new Types.ObjectId(addressId),
      userId: new Types.ObjectId(_id),
    });
    if (detailData) {
      return res.json({
        meta: { msg: "User address details found.", status: true },
        data: detailData,
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

const updateAddress = async (req, res) => {
  try {
    const { _id } = req.decoded;
    const { addressId } = req.params;
    const {
      name,
      addressType,
      mobile,
      pincode,
      addressLine1,
      addressLine2,
      cityName,
      stateName,
      countryName,
      isDefault,
    } = req.body;
    const findQuery = {
      _id: new Types.ObjectId(addressId),
      userId: new Types.ObjectId(_id),
    };
    const updateQuery = {
      mobile,
      addressType: addressType.toUpperCase(),
      name,
      addressId,
      pincode,
      addressLine1,
      addressLine2,
      cityName,
      stateName,
      countryName,
      isDefault,
    };
    if (isDefault === true) {
      await userAddressModel.updateMany(
        { userId: new Types.ObjectId(_id) },
        { $set: { isDefault: false } }
      );
    }
    const updateData = await userAddressModel.findOneAndUpdate(findQuery, {
      $set: updateQuery,
    });
    if (updateData) {
      return res.json({
        meta: { msg: "Address updated Successfully.", status: true },
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

const deleteAddress = async (req, res) => {
  try {
    const { _id } = req.decoded;
    const { addressId } = req.params;
    if (!addressId) {
      return res.json({
        meta: { msg: "Parameter missing.", status: false },
      });
    }
    // check for the associated order
    const deleteBanner = await userAddressModel.deleteOne({
      _id: new Types.ObjectId(addressId),
      userId: new Types.ObjectId(_id),
    });
    if (deleteBanner.deletedCount > 0) {
      return res.json({
        meta: { msg: `User address deleted Successfully.`, status: true },
      });
    } else {
      return res.json({
        meta: { msg: "Something went wrong", status: false },
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

const changeDefault = async (req, res) => {
  try {
    const { _id } = req.decoded;
    const { addressId } = req.params;
    if (!addressId) {
      return res.json({
        meta: { msg: "Parameter missing.", status: false },
      });
    }
    await userAddressModel.updateMany(
      { userId: new Types.ObjectId(_id) },
      { $set: { isDefault: false } }
    );
    const updateDefault = await userAddressModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(addressId),
        userId: new Types.ObjectId(_id),
      },
      { $set: { isDefault: true } }
    );
    if (updateDefault) {
      return res.json({
        meta: { msg: `Address changed to default Successfully.`, status: true },
      });
    } else {
      return res.json({
        meta: { msg: "Something went wrong", status: false },
      });
    }
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

module.exports = {
  addAddress,
  addressList,
  addressDetail,
  updateAddress,
  deleteAddress,
  changeDefault,
};
