const express = require("express");
const router = express.Router();
const Municipal_Title = require("../../models/Municipal_Title");

router.get("/", async (req, res) => {
  try {
    const data = await Municipal_Title.find({});
    if (!data) {
      return res.status(401).send("error");
    }
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

router.get("/filter/:head", async (req, res) => {
  try {
    const data = await Municipal_Title.find({agency : req.params.head});
    if (!data) {
      return res.status(401).send("error");
    }
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:title", async (req, res) => {
  try {
    const data = await Municipal_Title.find({title : {$regex: `${req.params.title}`}});
    if (!data) {
      return res.status(401).send("error");
    }
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});





//add title

router.post("/", async (req, res) => {
    try {
      const data = await Municipal_Title.create(req.body);
      if (!data) {
        return res.status(401).send("error");
      }
      res.send(data);
    } catch (err) {
      console.log(err);
    }
  });



module.exports = router