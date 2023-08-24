const express = require("express");
const router = express.Router();
const UrgentContact = require("../../models/UrgentContact");
const auth = require("../../middleware/auth");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./images/urgent/contact",
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

router.post("/", auth, upload.single('image'),async (req, res) => {
  const {name , detail , phone} = req.body;
  const image = req.file.filename;
  try {
    const data = await UrgentContact.create({
     name: name,
     detail: detail,
     phone: phone,
     image: image,
    });
    if (!data) {
      return res.status(401).send({ data: "error add contact" });
    }
    res.status(201).send({ data: "add contact success" });
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
});

module.exports = router;
