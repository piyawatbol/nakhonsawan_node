const express = require("express");
const router = express.Router();
const Users = require("../../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const {first_name, last_name, email, password, id_card, phone ,login_type,user_img} = req.body;
    encryptedPassword = await bcrypt.hash(password, 10);
  
    const check_email = await Users.findOne({email: email,login_type: login_type});
    const check_phone = await Users.findOne({phone: phone,login_type: login_type});
    const check_id_card = await Users.findOne({id_card: id_card,login_type: login_type});

   
    
    if(check_email){
      return res.status(409).send("Email has already been used");
    }  else if(check_phone){
      return res.status(409).send("Phone has already been used");
    } else if(check_id_card){
      return res.status(409).send("Id Card has already been used");
    }  
    const user = await Users.create({
      first_name,
      last_name,
      id_card,
      phone,
      email: email.toLowerCase(),
      password: encryptedPassword,
      user_img: "",
      login_type: login_type
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      { expiresIn: "2h" }
    );

    user.token = token;
    console.log(user);
    
    res.status(201).json({data : user});
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
