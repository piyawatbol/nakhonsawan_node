const express = require("express");
const router = express.Router();
const Appeal = require("../../models/Appeal");
const auth = require("../../middleware/auth");

router.post("/", auth,async (req, res) => {
  const id = req.body.id;
  const userId = req.user.user_id;
  const comment = req.body.comment;
  try {
    const data = await Appeal.findByIdAndUpdate(
      id,
      {
        $push: {
          comment: {
            user_id: userId,
            comment: comment,
          },
        },
      },
      { new: true }
    );
    if (!data) {
      return res.status(401);
    }
    res.status(201).send({data : "comment success"});
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
