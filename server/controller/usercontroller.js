const User = require("../models/user");

async function register(req, res) {
  try {
    let { email, password, name } = req.body;

    await User.create({
      name: name,
      email: email,
      password: password,
    });

    res.status(200).json({ message: "register sucessfull" });
  } catch (e) {
    res.status(500).json({ message: "internal server error" });
  }
}

module.exports = register;
