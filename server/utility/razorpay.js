const razorpay = require("razorpay");



const razorpayinstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY||"dsdad",
  key_secret: process.env.RAZORPAY_SECRET||"sadada",
});

module.exports = razorpayinstance;
