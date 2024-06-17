"use strict";
const { Types } = require("mongoose");
const { teamModel } = require("../model/teamModel");

const teamList = async (req, res) => {
  try {
    const response = await teamModel.find();
    console.log(response,'response');

    return res.json({
      meta: { msg: "Team list found.", status: true },
      data: response,
    });
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};
const teamAdd = async (req,res)=>{
  try {
    console.log(req.body,'request body');
    const {name,position,img,message}=req.body;
    console.log(name,position,img,message,'data')
    const response=await teamModel.create({
      name,position,img,message
    });
    console.log(response,'response team add');
    return res.json({
      meta: { msg: "team Added Successfully.", status: true },
      data: response,
    });
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    })
    
  }
}
const teamDelete = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.json({
        meta: { msg: "Parameter missing.", status: false },
      });
    }
    await teamModel.deleteOne({
      _id: new Types.ObjectId(id),
    });
    return res.json({
      meta: { msg: "team deleted successfully.", status: true },
    });
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

module.exports = {
  teamAdd,
  teamDelete,
  teamList
};
