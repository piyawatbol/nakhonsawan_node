const express = require("express");
const router = express.Router();
const Notify = require("../../models/Notify");
const multer = require("multer");
const path = require("path");
const auth = require("../../middleware/auth");

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

router.post("/",auth, async (req, res) => {
  const userId = req.user.user_id;
  const { latitude, longtitude, address_detail, type, level, notify_detail } =
  req.body;
  try {
    const data = await Notify.create({
      user_id: userId,
      latitude: latitude,
      longtitude: longtitude,
      address_detail: address_detail,
      type: type,
      level: level,
      notify_detail: notify_detail,
      comment: [],
    });
    if(!data){
      res.status(401).send({data : "error add notify"});
    }
    res.status(200).send({data : data.id});
  } catch (err) {
    console.log(err);
  }
});

router.post("/image/:id",  auth,upload.single("image"), async (req, res) => {
  const id = req.params.id;
  const image = req.file.filename;
  try {
    const data = await Notify.findByIdAndUpdate(id ,{ $push: { image: {url : image} } }, { new: true });
    if(!data){
      res.status(401).send("add image error")
    }
    res.status(200).send({data : "add image success"});
    console.log(data);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router
