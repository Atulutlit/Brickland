const mongoose = require("mongoose");

const contactInfoModel = mongoose.model("contact-infos", mongoose.Schema({
    contactInfoId: { type: mongoose.Types.ObjectId, auto: true },
    contactInformation: { type: String },
    address: { type: String },
    mobile: { type: Number },
    countryCode: { type: Number },
    email: { type: String },
    website: { type: String },
    facebookLink: { type: String },
    twitterLink: { type: String },
    instagramLink: { type: String },
    linkedInLink: { type: String },


    createdAt: Number,
    updatedAt: Number
}, { timestamps: true }));

module.exports = { contactInfoModel };