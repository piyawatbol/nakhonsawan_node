const express = require("express");
const router = express.Router();
const Users = require("../../models/Users");
const auth = require("../../middleware/auth")
const jwt = require("jsonwebtoken");

router.get("/", auth,async (req, res) => {
  const userId = req.user.user_id;
  console.log(userId);
  try {
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    const token = jwt.sign(
      { user_id: user._id, email: user.email },
      process.env.TOKEN_KEY,
      { expiresIn: "1d" }
    );

    user.token = token;
    // console.log(user);
    res.send({data:user});
  } catch (err) {
    console.log(err);
  }
});



module.exports = router