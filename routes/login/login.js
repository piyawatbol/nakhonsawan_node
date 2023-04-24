const express = require("express");
const router = express.Router();
const Users = require("../../models/Users");


router.get("/:uid", async (req, res) => {
  const uid = req.params.uid;
  try {
    const user = await Users.findOne({ uid : uid });
    if (!user) {
      return res.status(201).json("not have");
    }
    res.json([{"data":user}]);
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  const { email, pass_word } = req.body;
  try {
    const user = await Users.findOne({ email: email, pass_word: pass_word });
    if (!user) {
      return res.status(401).send("Invalid email or password");
    }
    res.json([{"data":user}]);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router
