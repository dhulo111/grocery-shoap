const express = require("express");

const router = express.Router();

const {
  register,
  login,
  profile,
  getcontact,
} = require("../controller/usercontroller");
const virifyTocken = require("../middleware/verifytocken");

router.post("/register", register);
router.post("/login", login);
router.post("/profile/:id", profile);

// contact mail system
router.post("/contact", virifyTocken, getcontact);

module.exports = router;
