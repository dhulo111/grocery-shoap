const express = require("express");

const router = express.Router();

const {
  register,
  getAllUser,
  login,
  profile,
  getcontact,
} = require("../controller/usercontroller");
const virifyTocken = require("../middleware/verifytocken");
const isAdmin = require("../middleware/authmiddleware");
router.post("/register", register);
router.post("/login", login);
router.post("/profile/:id", profile);
router.get("/alluser", virifyTocken, isAdmin, getAllUser);
// contact mail system
router.post("/contact", virifyTocken, getcontact);

module.exports = router;
