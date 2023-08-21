const express = require("express");
const router = express.Router();
const Municipal = require("../../models/Municipal");
const auth = require("../../middleware/auth");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./images/pdf",
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

router.post("/file/:id", auth, upload.single("file"), async (req, res) => {
  const id = req.params.id;
  const file = req.file.filename;
  const name= req.body.name;
  try {
    const data = await Municipal.findByIdAndUpdate(
      id,
      { $set: { form_file:[ {
          name: name,
          file_name: file
      } ]} },
      { new: true }
    );
    if (!data) {
      return res.status(401).send({ data: "error add minicipal" });
    }
    res.status(201).send({ data: "add minicipal success" });
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
});

module.exports = router;
