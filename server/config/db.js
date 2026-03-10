const mongoose = require("mongoose");

function connectDb() {
  mongoose
    .connect("mongodb+srv://ghu:987654321@cluster0.3modrgs.mongodb.net/")
    .then(() => console.log("database connected"))
    .catch((e) => console.log(e));
}

module.exports = connectDb;
