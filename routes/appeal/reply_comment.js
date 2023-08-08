const express = require("express");
const router = express.Router();
const Appeal = require("../../models/Appeal");

router.post("/", async (req, res) => {
  const id = req.body.id;
  console.log(id);
  try {
    const data = await Appeal.findByIdAndUpdate(id,{ $set: req.body }, { new: true });
    if (!data) {
      return res.status(401);
    }
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;