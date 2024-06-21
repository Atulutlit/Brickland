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


module.exports = {
  teamList
};
