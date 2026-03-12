const User = require("../models/user");
let bcrypt = require("bcrypt");

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

module.exports = register;
