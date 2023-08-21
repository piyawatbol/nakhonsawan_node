const express = require("express");
const router = express.Router();
const Journal = require("../../models/Journal");
const auth = require("../../middleware/auth");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // กำหนดพาธสำหรับบันทึกไฟล์รูปภาพ
        if (file.fieldname === "image") {
          cb(null, "./images/journal/image");
        }
        // กำหนดพาธสำหรับบันทึกไฟล์อื่น ๆ
        else if (file.fieldname === "file") {
          cb(null, "./images/journal/file");
        }
      },
      filename: (req, file, cb) => {
        cb(
          null,
          `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
        );
      },
  });
  
  const upload = multer({
    storage: storage,
  });
  
  router.post("/", auth, upload.fields([{ name: "image", maxCount: 2 }, { name: "file", maxCount: 2 }]), async (req, res) => {
    const { title, type } = req.body;
    const images = req.files["image"].map((file) => file.filename);
    const files = req.files["file"].map((file) => file.filename);
    const image = images[0];
    const file = files[0];
  
    try {
      const data = await Journal.create({
        image: image,
        file: file,
        title: title,
        type: type,
      });
      if (!data) {
        return res.status(401).send({ data: "error add journal" });
      }
      res.status(201).send({ data: "add journal success" });
    } catch (err) {
      console.log(err);
      res.status(500).send("error");
    }
  });

module.exports = router;
