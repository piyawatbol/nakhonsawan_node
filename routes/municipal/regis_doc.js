const express = require("express");
const router = express.Router();
const RegisDoc = require("../../models/RegisDoc");
const multer = require("multer");
const path = require("path");
const auth = require("../../middleware/auth");

const storage = multer.diskStorage({
  destination: "./images/regis_doc",
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
  const { title ,} = req.body;
  try {
    const data = await RegisDoc.create({
      user_id: userId,
      title: title,
    });
    if (!data) {
      return res.status(401).send("error");
    }
    res.send({id : data.id});
  } catch (err) {
    console.log(err);
  }
});

router.post("/file/:id", auth,upload.single("file"), async (req, res) => {
  const id = req.params.id;
  const file = req.file.filename;
  try {
    const data = await RegisDoc.findByIdAndUpdate(
      id,
      { $push: { file: file } },
      { new: true }
    );
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
