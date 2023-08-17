const express = require("express");
const router = express.Router();
const Notify = require("../../models/Notify");
const auth = require("../../middleware/auth");

router.get("/:status",auth, async (req, res) => {
  const userId = req.user.user_id;
  const status = req.params.status ;
  try {
    const data = await Notify.find({user_id : userId,status : status});
    if (!data) {
      return res.status(201).send("dont have");
    }
    res.status(201).send({data : data});
  } catch (err) {
    console.log(err);
  }
});



module.exports = router