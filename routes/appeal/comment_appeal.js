const express = require("express");
const router = express.Router();
const Appeal = require("../../models/Appeal");

router.post("/", async (req, res) => {
  const id = req.body.id;
  var currentdate = new Date();
  try {
    const data = await Appeal.findByIdAndUpdate(
      id,
      {
        $push: {
          comment: {
            uid: req.body.uid,
            comment: req.body.comment,
            comment_date_time: currentdate
          },
        },
      },
      { new: true }
    );
    
    if (!data) {
      return res.status(401);
    }

    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
