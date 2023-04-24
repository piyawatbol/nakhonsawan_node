const express = require("express");
const router = express.Router();
const Appeal = require("../../models/Appeal");

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Appeal.find({uid : id});
    if (!data) {
      return res.status(201).send("dont have");
    }
    res.send(data.reverse());
  } catch (err) {
    console.log(err);
  }
});



module.exports = router