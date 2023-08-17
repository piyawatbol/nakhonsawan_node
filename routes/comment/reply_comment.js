const express = require("express");
const router = express.Router();
const Appeal = require("../../models/Appeal");
const auth = require("../../middleware/auth");

router.post('/',auth, async (req, res) => {
  const post_id = req.body.post_id;
  const comment_id = req.body.comment_id;
  const { comment } = req.body;
  const userId = req.user.user_id;
  try {
    await Appeal.updateOne(
      { _id: post_id, "comment._id": comment_id },
      {
        $push: {
          "comment.$.reply": {
            user_id : userId,
            comment : comment,
            createdAt: new Date()
          }
        }
      }
    );
    res.status(201).send({ message: 'Reply added successfully' });
  } catch (err) {
    res.status(500).send({ error: 'Failed to add reply', reason: err });
  }
});

module.exports = router;
