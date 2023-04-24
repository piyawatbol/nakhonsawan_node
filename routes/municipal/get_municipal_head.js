const express = require("express");
const router = express.Router();
const Municipal_Head = require("../../models/Municipal_Head");

router.get("/", async (req, res) => {
  try {
    const data = await Municipal_Head.find({});
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
      const data = await Municipal_Head.create(req.body);
      if (!data) {
        return res.status(401).send("error");
      }
      res.send(data);
    } catch (err) {
      console.log(err);
    }
  });



module.exports = router