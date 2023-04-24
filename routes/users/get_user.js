const express = require("express");
const router = express.Router();
const Users = require("../../models/Users");

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Users.findById(id);
    if (!user) {
      return res.status(401).send("Invalid email or password");
    }
    res.send([{"data":user}]);
  } catch (err) {
    console.log(err);
  }
});



module.exports = router