const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String, require: true },
  phone: { type: Number },
  subject: { type: String },
  message: { type: String },
});

module.exports = mongoose.model("Contact", contactSchema);
