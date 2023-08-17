const express = require("express");
const router = express.Router();
const Appeal = require("../../models/Appeal");
const auth = require("../../middleware/auth");

router.get("/:id", auth,async (req, res) => {
  const userId = req.user.user_id;
  const id = req.params.id ;
  try {
    const data = (await (await Appeal.findById(id).select('comment').populate('comment.user_id').populate('comment.reply.user_id')));
    // .populate('comment.user_id'));
    if (!data) {
      return res.status(400).send("dont have");
    }
    res.status(201).send( data);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router