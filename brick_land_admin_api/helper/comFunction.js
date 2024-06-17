require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const jwtToken = async function (body) {
  const token = jwt.sign(body, process.env.jwtSecretKey, { expiresIn: "1y" });
  return token;
};

const bcryptfun = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

var randomFixedInteger = function (length) {
  return Math.floor(
    Math.pow(10, length - 1) +
      Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
  );
};

module.exports = {
  jwtToken,
  bcryptfun,
  randomFixedInteger
};
