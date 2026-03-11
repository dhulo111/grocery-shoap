const express = require("express");

const app = express();

const port = 3000;

const cors = require("cors");

const userroute = require("./routes/userroute");

const connectDb = require("./config/db");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Normal Route</h1>");
});

app.use("/user", userroute);

connectDb();

app.listen(port, () => {
  console.log("server is running on 3000 port");
});
