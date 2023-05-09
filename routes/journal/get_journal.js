const express = require("express");
const router = express.Router();
const Journal = require("../../models/Journal");

router.get("/", async (req, res) => {
  try {
    const data = await Journal.find({});
    if (!data) {
      return res.status(401).send("error");
    }
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:period", async (req, res) => {
    try {
      const data = await Journal.find({period : req.params.period});
      if (!data) {
        return res.status(401).send("error");
      }
      res.send(data);
    } catch (err) {
      console.log(err);
    }
  });

//add journal

router.post("/", async (req, res) => {
    try {
      const data = await Journal.create(req.body);
      if (!data) {
        return res.status(401).send("error");
      }
      res.send(data);
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router