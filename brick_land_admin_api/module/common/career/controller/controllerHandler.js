"use strict";
const { Types } = require("mongoose");
const { careerModel } = require("../model/model");

const careerList = async (req, res) => {
  try {
    const response = await careerModel.find({"status":true});
    console.log(response,'response');

    return res.json({
      meta: { msg: "Career list found.", status: true },
      data: response,
    });
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};
const careerAdd = async (req,res)=>{
  try {
    console.log(req.body,'request body')
    const response=await careerModel.create(req.body);
    console.log(response,'response');
    return res.json({
      meta: { msg: "Career Added Successfully.", status: true },
      data: response,
    });
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    })
  }
}
const careerDetail = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id) {
      return res.json({
        meta: { msg: "Parameter missing.", status: false },
      });
    }
    const detailData = await careerModel.findOne({
      _id: new Types.ObjectId(_id),
    });
    if (detailData) {
      return res.json({
        meta: { msg: "Career details found.", status: true },
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

module.exports = {
  careerList,
  careerDetail,
  careerAdd
};
