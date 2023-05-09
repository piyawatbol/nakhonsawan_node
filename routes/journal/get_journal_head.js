const express = require("express");
const router = express.Router();
const JournalHead = require("../../models/JournalHeadModel");

router.get("/", async (req, res) => {
  try {
    const data = await JournalHead.find({});
    if (!data) {
      return res.status(401).send("error");
    }
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

//add head

router.post("/", async (req, res) => {
    try {
      const data = await JournalHead.create(req.body);
      if (!data) {
        return res.status(401).send("error");
      }
      res.send(data);
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router