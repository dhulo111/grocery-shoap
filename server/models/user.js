const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String, require: true },
  password: { type: String, require: true },
  role: { type: String, enum: ["user", "Admin"], default: "user" },
});

module.exports = mongoose.model("User", userSchema);
