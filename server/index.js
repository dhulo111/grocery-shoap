const express = require("express");
require("dotenv").config();
const app = express();

const cors = require("cors");

const userroute = require("./routes/userroute");
const productroute=require("./routes/productroute")

const connectDb = require("./config/db");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Normal Route</h1>");
});

app.use("/user", userroute);
app.use("/product",productroute);
connectDb();

app.listen(process.env.PORT, () => {
  console.log("server is running on 3000 port");
});
