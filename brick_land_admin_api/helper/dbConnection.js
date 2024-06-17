const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async function () {
  const mongoUrl = process.env.mongoDbUrl;
  try {
    console.log("Establishing Mongo DB Connection...");
    const x = await mongoose.connect(mongoUrl);
    console.log(`Mongo DB (${mongoUrl}) Connected :)`);
    return false;
  } catch (error) {
    console.log("==== DB Connection Error ====", error.message);
    throw error;
  }
};

module.exports = { dbConnect };
