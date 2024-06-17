const nodemailer = require("nodemailer");
require("dotenv").config();

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SSL, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // generated ethereal user
    pass: process.env.SMTP_PASSWORD,
  },
});

const send_mail = async ({
  from = process.env.DEFAULT_EMAIL,
  to,
  subject,
  html,
  cc,
}) => {
  try {
    let response = await transporter.sendMail({ from, to, subject, html, cc });
    console.log(response);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { send_mail };
