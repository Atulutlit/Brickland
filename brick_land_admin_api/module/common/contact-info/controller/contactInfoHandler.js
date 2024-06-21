'use strict';
const { Types } = require("mongoose");
const { contactInfoModel } = require("../model/contactInfoModel");

const addContactInfo = async function (req, res) {
    try {
        const {
            contactInformation,
            address,
            countryCode,
            mobile,
            email,
            website,
            facebookLink,
            twitterLink,
            instagramLink,
            linkedInLink,
        } = req.body;
        if (!contactInformation ||
            !address ||
            !mobile ||
            !countryCode ||
            !email ||
            !website ||
            !facebookLink ||
            !twitterLink ||
            !instagramLink ||
            !linkedInLink) {
            return res.json({
                meta: { msg: "Parameter missing.", status: false },
            });
        }
        const addObj = {
            contactInformation,
            address,
            mobile,
            countryCode,
            email,
            website,
            facebookLink,
            twitterLink,
            instagramLink,
            linkedInLink,
        };
        const findContactInfo = await contactInfoModel.find();
        if (findContactInfo.length) {
            const findQuery = {
                contactInfoId: findContactInfo[0].contactInfoId
            }
            const updateContactInfo = await contactInfoModel.findOneAndUpdate(findQuery, { $set: addObj }, { new: true })
            if (updateContactInfo) {
                return res.json({
                    meta: { msg: 'Contact info info updated successsfully', status: true },
                    data: updateContactInfo
                })
            } else {
                return res.json({
                    meta: { msg: 'Something went wrong.', status: false }
                })
            }
        } else {
            const addData = await contactInfoModel(addObj).save()
            return res.json({
                meta: { msg: 'Contact info info added successsfully', status: true },
                data: addData
            })
        }
    } catch (error) {
        return res.json({
            meta: { msg: error.message, status: false }
        })
    }
}

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
    addContactInfo,
    contactInfoDetail,
};