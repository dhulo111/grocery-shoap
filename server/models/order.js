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

const Orderschema = mongoose.Schema(
  {
    userid: { type: mongoose.Types.ObjectId, ref: "User", require: true },
    items: [product],
    totalAmount: { type: Number },
    status: {
      type: String,
      enum: ["pending", "approved", "shiped", "delivered"],
      default: "pending",
    },
    paymentstatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Order", Orderschema);
