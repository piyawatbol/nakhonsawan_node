const express = require("express");
const router = express.Router();
const Municipal = require("../../models/Municipal");
const auth = require("../../middleware/auth");

//all
router.get("/all", auth, async (req, res) => {
  try {
    const data = await Municipal.find({});
    if (!data) {
      return res.status(401).send("error");
    }
    res.send({ data: data });
  } catch (err) {
    console.log(err);
  }
});

// get title by head
router.get("/title/search/:head", auth, async (req, res) => {
  console.log(req.params.head);
  try {
    const data = await Municipal.find({
      title: { $regex: req.params.head, $options: "i" },
    });
    if (data.length <= 0) {
      return res.status(400).send("not have");
    }
    console.log(`data ${data}`);
    res.send({ data: data });
  } catch (err) {
    console.log(err);
  }
});

router.get("/title/:head", auth, async (req, res) => {
  console.log(req.params.head);
  try {
    const data = await Municipal.find({agency : req.params.head});
    if (data.length <= 0) {
      return res.status(400).send("not have");
    }
    console.log(`data ${data}`);
    res.send({ data: data });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
