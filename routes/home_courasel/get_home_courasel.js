const express = require("express");
const router = express.Router();
const HomeCourasel = require("../../models/HomeCourasel");
const auth = require("../../middleware/auth");

router.get("/",auth, async (req, res) => {

  try {
    const data = await HomeCourasel.find({});
    if (!data) {
      return res.status(201).send("dont have");
    }
    res.status(201).send({data : data});
  } catch (err) {
    console.log(err);
  }
});



module.exports = router