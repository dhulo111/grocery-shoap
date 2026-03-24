const express = require("express");
const multer = require("multer");
const {addproduct,getallproduct,deleteproduct,updateproduct} = require("../controller/productcontroller");

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

router.post("/add", upload.single("img"), addproduct);
router.get("/all",getallproduct);
router.delete('/delete/:id',deleteproduct);
router.put('/update/:id',upload.single("img"),updateproduct)

module.exports = router;
