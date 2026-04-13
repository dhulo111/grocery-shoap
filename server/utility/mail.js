const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const verifytransporter = async () => {
  try {
    await transporter.verify();
    console.log("smtp ready to send mail");
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = { transporter, verifytransporter };
