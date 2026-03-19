const express = require("express");
const multer = require("multer");
const addproduct = require("../controller/productcontroller");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null, "upload");
  },
});

let upload = multer({storage:storage});

router.post("/add",upload.single('img'),addproduct);

module.exports = router;
