const express = require("express");
const router = express.Router();
const Journal = require("../../models/Journal");
const auth = require("../../middleware/auth");

router.get("/:interval", auth, async (req, res) => {
  try {
    const { interval } = req.params;
    const currentDate = new Date();
    const startDate = new Date(currentDate);
    const endDate = new Date(currentDate);

    if (interval === "day") {
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
    } else if (interval === "week") {
      startDate.setDate(startDate.getDate() - currentDate.getDay());
      startDate.setHours(0, 0, 0, 0);
      endDate.setDate(endDate.getDate() + 6);
      endDate.setHours(23, 59, 59, 999);
    } else if (interval === "month") {
      startDate.setDate(1);
      startDate.setHours(0, 0, 0, 0);
      endDate.setMonth(endDate.getMonth() + 1);
      endDate.setDate(0);
      endDate.setHours(23, 59, 59, 999);
    } else {
      return res.status(400).send("Invalid interval");
    }

    const data = await Journal.find({
      createdAt: { $gte: startDate, $lte: endDate }
    });

    if (!data || data.length === 0) {
      return res.status(404).send("No data found");
    }

    res.status(200).send({ data: data });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get('/search/:text',auth,async(req,res) => {
  try{
    const data = await Journal.find({
      title: { $regex: req.params.text, $options: "i" },
    })
    if (data.length <= 0) {
      return res.status(401).send("don't have data");
    }
    console.log(`data ${data}`);
    res.send({ data: data });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router