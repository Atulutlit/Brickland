const jwt = require("jsonwebtoken");
const { userModel } = require("../module/common/user/model/userModel");
require("dotenv").config();

/************************************************************************************************************
 *                                         customer [ Authentication ]
 ************************************************************************************************************/

const jwtCustomerVerify = async (req, res, next) => {
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
        userModel.findOne({ _id: decoded._id }).then((result) => {
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
          req.decoded = decoded;
          next();
        });
      }
    }
  );
};

module.exports = { jwtCustomerVerify };
