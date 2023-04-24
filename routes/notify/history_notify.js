const express = require("express");
const router = express.Router();
const Notify = require("../../models/Notify");

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Notify.find({uid : id});
    if (!data) {
      return res.status(201).send("dont have");
    }
    res.send(data.reverse());
  } catch (err) {
    console.log(err);
  }
});



module.exports = router