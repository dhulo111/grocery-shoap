const User = require("../models/user");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

async function register(req, res) {
  try {
    let { email, password, name } = req.body;

    let existing = await User.findOne({ email });

    if (existing) {
      return res.status(400).json({ message: "user alreadyn exist" });
    }

    let hashpassword = await bcrypt.hash(password, 10);

    await User.create({
      name: name,
      email: email,
      password: hashpassword,
    });

    res.status(200).json({ message: "register sucessfull" });
  } catch (e) {
    res.status(500).json({ message: "internal server error" });
  }
}

async function login(req, res) {
  try {
    let { email, password } = req.body;

    let existing = await User.findOne({ email });

    if (!existing) {
      return res.status(400).json({ message: "user not found" });
    }

    let matchpassword = await bcrypt.compare(password, existing.password);

    if (!matchpassword) {
      return res.status(400).json({ message: "password do not match" });
    }

    const tocken = await jwt.sign(
      { id: existing._id },
      process.env.JWT_SECRET,
      { expiresIn: "1D" },
    );

    res
      .status(200)
      .json({ message: "login sucessfull", tocken: tocken, user: existing });
  } catch (e) {
    res.status(500).json({ message: "interna;l server error" });
  }
}

async function profile(req, res) {
  try {
    let id = req.params.id;

    const user = await User.findOne({ _id: id });

    res.status(200).json({ user: user });
  } catch (e) {
    res.status(500).json({ message: "internal server error" });
  }
}

module.exports = { register, login, profile };
