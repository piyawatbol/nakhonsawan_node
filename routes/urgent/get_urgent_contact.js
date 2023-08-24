const express = require("express");
const router = express.Router();
const UrgentContact = require("../../models/UrgentContact");
const auth = require("../../middleware/auth");

router.get("/",auth, async (req, res) => {

  try {
    const data = await UrgentContact.find({});
    if (!data) {
      return res.status(201).send("dont have");
    }
    res.status(201).send({data : data});
  } catch (err) {
    console.log(err);
  }
});

router.get("/search/:name",auth, async (req, res) => {
  const name = req.params.name ;
  try {
    const data = await UrgentContact.find({
      name: { $regex: name, $options: "i" },
    });
    if (!data) {
      return res.status(201).send("dont have");
    }
    res.status(201).send({data : data});
  } catch (err) {
    console.log(err);
  }
});



module.exports = router