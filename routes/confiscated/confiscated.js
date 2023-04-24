const express = require("express");
const router = express.Router();
const ConfiscatedItem = require("../../models/ConfiscatedItem");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./images/confiscated",
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


router.get("/", async (req, res) => {
    try {
      const data = await ConfiscatedItem.find({});
      if (!data) {
        return res.status(401).send("Invalid email or password");
      }
      res.send(data);
    } catch (err) {
      console.log(err);
    }
  });


//add 

router.post("/",upload.single("image"),  async (req, res) => {

  var currentdate = new Date();
  const date = `${currentdate.getDate()}/${
    currentdate.getMonth() + 1
  }/${currentdate.getFullYear()}`;
  const time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
  req.body.date = date;
  req.body.time = time;
  req.body.image = req.file.filename;
  try {
    const data = await ConfiscatedItem.create(req.body);
    res.status(200).send(data);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router
