const express = require("express");
const router = express.Router();
const Appeal = require("../../models/Appeal");
const auth = require("../../middleware/auth");

router.post("/", auth, async (req, res) => {
  const { latitude, longtitude, address_detail, type, title, appeal_detail } =
    req.body;
  const userId = req.user.user_id;
  try {
    const data = await Appeal.create({
      user_id: userId,
      latitude: latitude,
      longtitude: longtitude,
      address_detail: address_detail,
      type: type,
      title: title,
      appeal_detail: appeal_detail,
      comment: []
    });
    if (!data) {
      return res.status(401).send({ data: "error add appeal" });
    }
    res.status(201).send({ data: "add appeal succes" });
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
});

module.exports = router;
