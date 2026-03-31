const jwt = require("jsonwebtoken");
const User = require("../models/user");
async function virifyTocken(req, res, next) {
  try {
    let tocken = req.headers.authorization;

    let finaltocken = tocken.split(" ")[1];
    let decode = jwt.decode(finaltocken, process.env.JWT_SECRET);
    let userid = decode.id;

    const user = await User.findOne({ _id: userid });

    req.user = user;

    next();
  } catch (e) {
    res.status(500).json({ message: "internal server error" });
  }
}

module.exports = virifyTocken;
