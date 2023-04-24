const express = require("express");
const router = express.Router();
const Users = require("../../models/Users");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./images/users",
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

router.post("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Users.findByIdAndUpdate(id ,{ $set: req.body }, { new: true });
    if (!data) {
      return res.status(401).send(data);
    }
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

router.post("/image/:id",upload.single("image"), async (req, res) => {
    const id = req.params.id;
    const image = req.file.filename;
    try {
      const data = await Users.findByIdAndUpdate(id ,{ $set: {user_img: image }}, { new: true });
      if (!data) {
        return res.status(401).send(data);
      }
      res.send(data);
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router