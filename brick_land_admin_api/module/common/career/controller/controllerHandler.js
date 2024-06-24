"use strict";
const { Types } = require("mongoose");
const { careerModel } = require("../model/model");

const careerList = async (req, res) => {
  try {
    const response = await careerModel.find();
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
    const response=await careerModel.create(req.body.data);
    console.log(response,'response');
    return res.json({
      meta: { msg: "Career Added Successfully.", status: true },
      data: response,
    }),200
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    }),500
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

const removeCareer = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        meta: { msg: "Invalid ID format.", status: false },
      });
    }

    const result = await careerModel.deleteOne({ _id: new Types.ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        meta: { msg: "Document not found.", status: false },
      });
    }

    return res.json({
      meta: { msg: "Successfully deleted.", status: true },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      meta: { msg: "Internal server error.", status: false },
    });
  }
};

const careerUpdate = async (req, res) => {

try {
  const data = req.body;
  const id = req.params;
  console.log(data,'data')
 

  const updateStatus = await careerModel.updateOne(
    { _id: new Types.ObjectId(id) },
    {
      $set: data,
    }
  );
  if (updateStatus.modifiedCount > 0) {
    return res.json({
      meta: {
        msg: `career updated successfully.`,
        status: true,
      },
    });
  } else {
    return res.json({
      meta: { msg: "something went wrong", status: false },
    });
  }
} catch (error) {
  return res.json({
    meta: { msg: error.message, status: false },
  });
}
}

module.exports = {
  careerList,
  careerDetail,
  careerAdd,
  removeCareer,
  careerUpdate,
};
