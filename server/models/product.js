const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  pname: { type: String },
  price: { type: Number, require: true },
  img: { type: String, require: true },
  description: { type: String, require: true },
  rating: { type: Number },
});

module.exports = mongoose.model("Product", productSchema);
