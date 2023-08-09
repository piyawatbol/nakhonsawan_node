const express = require("express");
const router = express.Router();
const Users = require("../../models/Users");
const multer = require("multer");
const path = require("path");
const auth = require("../../middleware/auth");
const fs = require("fs");

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

router.post("/", auth, async (req, res) => {
  const { first_name, last_name, id_card, phone, email } = req.body;

  if ((!first_name || !last_name || !id_card || !phone, !email)) {
    return res.status(401).send("missing information");
  }

  const userId = req.user.user_id;
  try {
    const data = await Users.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true }
    );
    if (!data) {
      return res.status(401).send("user not edit");
    }
    res.status(201).send("edit success");
  } catch (err) {
    console.log(err);
  }
});

router.post("/image", auth, upload.single("image"), async (req, res) => {
  const userId = req.user.user_id;
  const image = req.file.filename;
  console.log(image);
  try {
    const userData  = await Users.findById(userId);
    const oldImage =  userData.user_img ;
    var filePath = `../../images/users/${oldImage}`;
    var imagePage = path.join(__dirname,filePath);
    if(oldImage){
      fs.unlinkSync(imagePage)
    }
    const data = await Users.findByIdAndUpdate(
      userId,
      { $set: { user_img: image } },
      { new: true }
    );
    if (!data) {
      return res.status(401).send('edit image something wrong');
    }
    res.status(201).send("edit image success")
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
