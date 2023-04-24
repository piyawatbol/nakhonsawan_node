const express = require("express");
const router = express.Router();
const Notify = require("../../models/Notify");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./images/notify",
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

router.post("/", async (req, res) => {
  var currentdate = new Date();
  const date = `${currentdate.getDate()}/${
    currentdate.getMonth() + 1
  }/${currentdate.getFullYear()}`;
  const time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
  req.body.date = date;
  req.body.time = time;
  try {
    const data = await Notify.create(req.body);
    res.status(200).send(data);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
});

router.put("/image/:id",  upload.single("image"), async (req, res) => {
  const id = req.params.id;
  const image = req.file.filename;
  try {
    const data = await Notify.findByIdAndUpdate(id ,{ $push: { image: image } }, { new: true });
    res.status(200).send(data);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router
