const Product = require("../models/product");

async function addproduct(req, res) {
  try {
    let { pname, price, description, rating } = req.body;

    await Product.create({
      pname: pname,
      description: description,
      rating: rating,
      img: req.file.filename,
      price: price,
    });

    res.status(200).json({ message: "product created sucessfull" });
  } catch (e) {
    res.status(500).json({ message: "internal server error" });
  }
}

async function getallproduct(req, res) {
  try {
    let product = await Product.find();

    res.status(200).json({ product: product });
  } catch (e) {
    res.status(500).json({ message: "internal server error" });
  }
}

module.exports = { addproduct, getallproduct };
