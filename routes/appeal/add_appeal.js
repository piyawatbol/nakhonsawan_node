const express = require("express");
const router = express.Router();
const Appeal = require("../../models/Appeal");

router.post("/", async (req, res) => {
  var currentdate = new Date();
  const date = `${currentdate.getDate()}/${
    currentdate.getMonth() + 1
  }/${currentdate.getFullYear()}`;
  const time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
  req.body.date = date;
  req.body.time = time;
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