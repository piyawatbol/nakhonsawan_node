const express = require("express");
const router = express.Router();
const Appeal = require("../../models/Appeal");

router.post("/", async (req, res) => {
  req.body.comment = [];
  try {
    const data = await Appeal.create(req.body);
    if (!data) {
      return res.status(401);
    }
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});



module.exports = router