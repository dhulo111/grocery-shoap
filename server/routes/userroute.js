const express = require("express");

const router = express.Router();

const { register, login, profile } = require("../controller/usercontroller");

router.post("/register", register);
router.post("/login", login);
router.post("/profile/:id", profile);

module.exports = router;
