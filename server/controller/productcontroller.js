const Product = require("../models/product");
const Cart = require("../models/cart");
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

async function deleteproduct(req, res) {
  try {
    let id = req.params.id;
    await Product.findByIdAndDelete({ _id: id });

    res.status(200).json({ message: "product deleted" });
  } catch (e) {
    res.status(500).json({ message: "internal server error" });
  }
}

async function updateproduct(req, res) {
  try {
    let id = req.params.id;
    let { pname, price, description, rating } = req.body;

    let product = await Product.findOne({ _id: id });

    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }

    await Product.findByIdAndUpdate(id, {
      pname: pname,
      description: description,
      rating: rating,
      img: req.file.filename,
      price: price,
    });

    res.status(200).json({ message: "product updated" });
  } catch (e) {
    res.status(500).json({ message: "internal server error" });
  }
}

async function getproduct(req, res) {
  try {
    let { id } = req.params;

    const product = await Product.findOne({ _id: id });

    res.status(200).json(product);
  } catch (e) {
    res.status(500).json({ message: "internal server error" });
  }
}

// cart controllers

async function addtocart(req, res) {
  try {
    let { productid, userid } = req.body;

    let product = await Product.findOne({ _id: productid });

    console.log(product);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }

    let cart = await Cart.findOne({ userid: userid });

    if (!cart) {
      cart = new Cart({
        userid: userid,
        items: [],
      });
    }

    const index = await cart.items.findIndex(
      (item) => item.productid.toString() == productid,
    );

    if (index > -1) {
      cart.items[index].quentity += 1;
    } else {
      cart.items.push({
        productid: productid,
        pname: product.pname,
        price: product.price,
        rating: product.rating,
        description: product.description,
        img: product.img,
      });
    }

    cart.totalAmount = cart.items.reduce(
      (curr, item) => curr + item.price * item.quentity,
      0,
    );

    await cart.save();

    res.status(200).json({ message: "product added sucessfull" });
  } catch (e) {
    res.status(500).json({ message: "internal server error", e: e.message });
  }
}

async function getcart(req, res) {
  try {
    let { id } = req.params;

    const cart = await Cart.findOne({ userid: id });

    res.status(200).json({ cart });
  } catch (e) {
    res.status(500).json({ message: "internal server error" });
  }
}

module.exports = {
  addproduct,
  getallproduct,
  getproduct,
  deleteproduct,
  addtocart,
  getcart,
  updateproduct,
};
