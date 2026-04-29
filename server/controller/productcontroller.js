const Product = require("../models/product");
const Cart = require("../models/cart");
const Order = require("../models/order");
const instance = require("../utility/razorpay");
const crypto = require("crypto");
// product

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

async function removecart(req, res) {
  try {
    let { id, userid } = req.params;

    let cart = await Cart.findOne({ userid: userid });

    let item = cart.items.filter((i) => i.productid.toString() == id, 0);

    if (item) {
      item[0].quentity -= 1;
    }

    if (item[0].quentity <= 0) {
      cart.items.remove(item[0]);
    }

    cart.totalAmount = cart.items.reduce(
      (curr, item) => curr + item.price * item.quentity,
      0,
    );

    await cart.save();

    res.status(200).json({ message: "product remove sucessfull" });
  } catch (e) {
    res.status(500).json({ message: "internl server error", e: e.message });
  }
}

// order controller

async function createorder(req, res) {
  try {
    let { amount, currency } = req.body;

    const option = {
      amount: amount * 100,
      currency: currency || "INR",
    };

    const order = await instance.orders.create(option);

    res.status(200).json(order);
  } catch (e) {
    res.status(500).json({ message: "internal server error" });
  }
}

async function verifypayment(req, res) {
  try {
    let { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedsign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign)
      .digest("hex");

    if (razorpay_signature !== expectedsign) {
      return res.status(400).json({ message: "signature not valid" });
    }

    let userid = req.user._id;

    let cart = await Cart.findOne({ userid: userid });

    if (!cart) {
      res.status(404).json({ message: "cart not found" });
    }

    const neworder = new Order({
      userid: userid,
      items: cart.items.map((item) => ({
        productid: item.productid,
        img: item.img,
        price: item.price,
        rating: item.rating,
        quentity: item.quentity,
        pname: item.pname,
        description: item.description,
      })),
      totalAmount: cart.totalAmount,
      paymentid: razorpay_payment_id,
      orderid: razorpay_order_id,
      signature: razorpay_signature,
      paymentstatus: "paid",
    });

    neworder.save();

    await Cart.findOneAndDelete({ userid: userid });

    res.status(200).json("order placed");
  } catch (e) {
    res.status(500).json({ message: "internal server error" });
  }
}

async function getuserorders(req, res) {
  try {
    let { id } = req.params;
    let order = await Order.find({ userid: id });

    if (!order) {
      res.status(404).josn({ message: "oreder not found" });
    }
    res.status(200).json(order);
  } catch (e) {
    res.status(500).json({ message: "internal server error", e: e.message });
  }
}

async function getallorder(req, res) {
  try {
    let order = await Order.find();

    if (!order) {
      res.status(404).josn({ message: "oreder not found" });
    }

    console.log(order);
    res.status(200).json(order);
  } catch (e) {
    res.status(500).json({ message: "internal server error" });
  }
}

async function updateorder(req, res) {
  try {
    console.log(req.body);
    const { id } = req.params;

    await Order.findByIdAndUpdate({ _id: id }, { status: req.body.status });

    res.status(200).json({ message: "order updated sucessfull" });
  } catch (e) {
    res.status(500).json({ message: "internal server error" });
  }
}

module.exports = {
  addproduct,
  getallproduct,
  getproduct,
  deleteproduct,
  updateorder,
  getuserorders,
  removecart,
  verifypayment,
  createorder,
  addtocart,
  getallorder,
  getcart,
  updateproduct,
};
