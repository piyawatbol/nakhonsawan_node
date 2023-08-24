const express = require("express");
const router = express.Router();
const HomeCourasel = require("../../models/HomeCourasel");
const auth = require("../../middleware/auth");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./images/home_courasel",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
});

router.post("/", auth, upload.single("image"), async (req, res) => {
  const image = req.file.filename;
  const {name} = req.body;
  try {
    const data = await HomeCourasel.create({
     name : name,
     image : image,
    });
    if (!data) {
      return res.status(401).send({ data: "error add image" });
    }
    res.status(201).send({ data: "add image success" });
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
});

module.exports = router;
