const mongoose = require("mongoose");

const product = {
  productid: { type: mongoose.Types.ObjectId, ref: "Product" },
  pname: { type: String },
  price: { type: Number, require: true },
  img: { type: String, require: true },
  description: { type: String, require: true },
  rating: { type: Number },
  quentity: { type: Number, default: 1 },
};

const cartschema = mongoose.Schema({
  userid: { type: mongoose.Types.ObjectId, ref: "User" },
  items: [product],
  totalAmount: { type: Number },
});

module.exports = mongoose.model("Cart", cartschema);
