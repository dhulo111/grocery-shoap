const mongoose = require("mongoose");

function connectDb() {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("database connected"))
    .catch((e) => console.log(e));
}

module.exports = connectDb;
