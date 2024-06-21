'use strict';
const { Types } = require("mongoose");
const { contactInfoModel } = require("../model/contactInfoModel");

const contactInfoDetail = async (req, res) => {
    try {
        console.log("contac information detail")
        const detailData = await contactInfoModel.find({});
        if (detailData) {
            return res.json({
                meta: { msg: "contact info details found.", status: true },
                data: detailData[0]
            });
        } else {
            return res.json({
                meta: { msg: "contact info details not found.", status: false },
            });
        }
    } catch (error) {
        return res.json({
            meta: { msg: error.message, status: false }
        });
    }
}


module.exports = {
    contactInfoDetail,
};