const express = require("express");
const router = express.Router();
const Users = require("../../models/Users");

router.post("/", async (req, res) => {
  const email = req.body.email
  const pass_word = req.body.pass_word
  const filter = { email: email};
  const update = { pass_word: pass_word};
  console.log(`${filter} ${update}`)
  try {
    const data = await Users.findOneAndUpdate(filter, update, { new: true });
    if (!data) {
      res.status(401).send("not success");
    }
    res.status(200).send("success");
    console.log(data);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
