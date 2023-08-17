const express = require("express");
const router = express.Router();
const Appeal = require("../../models/Appeal");
const auth = require("../../middleware/auth");

router.get("/:status", auth,async (req, res) => {
  const userId = req.user.user_id;
  const status = req.params.status ;
  try {
    const data = (await Appeal.find({user_id : userId,status : status}))
    // .populate('comment.user_id'));
    if (!data) {
      return res.status(400).send("dont have");
    }
    res.status(201).send({data : data});
  } catch (err) {
    console.log(err);
  }
});

module.exports = router