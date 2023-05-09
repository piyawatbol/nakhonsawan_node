const express = require("express");
const router = express.Router();
const Appeal = require("../../models/Appeal");

router.get("/:id/:status", async (req, res) => {
  const id = req.params.id;
  const status = req.params.status;
  console.log(status);
  try {
    const data = (await Appeal.find({uid : id,status : status}).populate('uid').populate('comment.uid').populate('comment.reply.uid'));
    if (!data) {
      return res.status(201).send("dont have");
    }
    res.send(data.reverse());
  } catch (err) {
    console.log(err);
  }
});



module.exports = router