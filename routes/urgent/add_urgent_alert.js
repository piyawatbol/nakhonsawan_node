const express = require("express");
const router = express.Router();
const UrgentAleart = require("../../models/UrgentAleart");
const auth = require("../../middleware/auth");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./images/urgent/alert",
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
  const {title , detail , type} = req.body;
  try {
    const data = await UrgentAleart.create({
      title : title,
      detail: detail,
      type: type,
      image: [
        {url : image}
      ]
    });
    if (!data) {
      return res.status(401).send({ data: "error add alert" });
    }
    res.status(201).send({ data: "add alert success" });
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
});

module.exports = router;
