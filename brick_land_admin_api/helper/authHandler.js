const jwt = require("jsonwebtoken");
const { adminModel } = require("../module/admin/model/adminModel");
require("dotenv").config();

/************************************************************************************************************
 *                                         Admin [ Authentication ]
 ************************************************************************************************************/

const jwtAdminVerify = async (req, res, next) => {
  if (
    req.headers.authkey == "null" ||
    req.headers.authkey == "" ||
    req.headers.authkey == "undefined" ||
    req.headers.authkey == null ||
    req.headers.authkey == undefined
  ) {
    return res.status(401).json({
      meta: { msg: "Unauthorized Access", status: false },
    });
  }
  jwt.verify(
    req.headers.authkey,
    process.env.jwtSecretKey,
    function (err, decoded) {
      if (err) {
        return res.status(401).json({
          meta: { msg: "Unauthorized Access", status: false },
        });
      } else {
        adminModel.findOne({ _id: decoded._id }).then((result) => {
          if (!result) {
            return res.status(401).json({
              meta: {
                msg: "Unauthorized Access",
                status: false,
                action: "logOut",
              },
            });
          }
          if (result && (!result.isLogin || result.status != "ACTIVE")) {
            return res.status(440).json({
              meta: { msg: "Session Expired.", status: false },
            });
          }
          req.decoded = { ...decoded, role: result.role };
          next();
        });
      }
    }
  );
};

module.exports = { jwtAdminVerify };
