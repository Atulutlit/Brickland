const { adminModel } = require("./module/admin/model/adminModel");
const md5 = require("md5");

exports.createSuperAdmin = async function () {
  try {
    const email = "admin@brickland.com";
    const adminExist = await adminModel.findOne({ email });
    if (!adminExist) {
      console.log("Admin Does not Exist, Creating New");
      const hashedPassword = md5("123456");
      const obj = {
        name: "admin",
        email,
        password: hashedPassword,
        adminType: "SUPERADMIN",
        profilePic: "",
      };
      await new adminModel(obj).save();
      console.log("admin data added Successfully.");
    } else {
      console.log("admin already exists.");
    }
  } catch (error) {
    console.log(error);
    // return res.send(res, 400, "Internal Server Error.", err);
  }
};
