const express = require("express");

const router = express.Router();

const login = require("../controller/usercontroller");

router.get("/", login);


module.exports = router;
