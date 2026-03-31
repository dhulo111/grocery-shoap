const express = require("express");
const multer = require("multer");
const {
  addproduct,
  getallproduct,
  getproduct,
  getcart,
  addtocart,
  deleteproduct,
  updateproduct,
} = require("../controller/productcontroller");
const virifyTocken = require("../middleware/verifytocken");
const isAdmin = require("../middleware/authmiddleware");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload");
  },
  filename: (req, file, cb) => {
    let name = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + name);
  },
});

let upload = multer({ storage: storage });

router.post("/add", virifyTocken, isAdmin, upload.single("img"), addproduct);

// cart routes
router.post("/cart/add", virifyTocken, addtocart);
router.get("/cart/get/:id", virifyTocken, getcart);



router.get("/all", virifyTocken, getallproduct);
router.get("/detail/:id", getproduct);
router.delete("/delete/:id", virifyTocken, isAdmin, deleteproduct);
router.put(
  "/update/:id",
  virifyTocken,
  isAdmin,
  upload.single("img"),
  updateproduct,
);

module.exports = router;
