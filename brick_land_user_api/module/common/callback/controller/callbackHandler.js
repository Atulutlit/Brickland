"use strict";
const { Types } = require("mongoose");
const { callbackModel } = require("../model/callbackModel");

const addCallback = async function (req, res) {
  try {
    // const { _id } = req.decoded;
    const { firstName, lastName, email, mobile, comment, city } = req.body;
    const addCallback = {
      firstName,
      lastName,
      email,
      mobile,
      city,
      comment,
    };
    const addCallbackData = await callbackModel.create(addCallback);
    if (addCallbackData) {
      return res.json({
        meta: { msg: "Contact us added Successfully.", status: true },
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

module.exports = {
  addCallback,
};
