const express = require("express");
const router = express.Router();
const MunicipalForm = require("../../models/MunicipalForm")
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./images/municipal_form",
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
  try {
    const data = await MunicipalForm.create(req.body);
    if (!data) {
      return res.status(401).send("error");
    }
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

router.put("/file/:id", upload.single("file"), async (req, res) => {
  const id = req.params.id;
  const file = req.file.filename;
  try {
    const data = await MunicipalForm.findByIdAndUpdate(
      id,
      { $push: { file: file } },
      { new: true }
    );
    res.status(200).send(data);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
