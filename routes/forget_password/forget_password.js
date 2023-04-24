const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Users = require("../../models/Users");
const ForgetPass = require("../../models/ForgetPass");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pywsddbol2@gmail.com",
    pass: "ldhuaoybaedkoxqb",
  },
});

router.post("/", async (req, res) => {
  const email = req.body.email;

  try {
    const data = await Users.findOne({ email: email });
    if (!data) {
      return res.status(401).send("Not have Email");
    }
    function getRandom(max) {
      return Math.floor(Math.random() * max);
    }
    otp = getRandom(999999);
    if (otp.length < 6) {
      while (otp.length < 6) {
        otp = getRandom(999999);
      }
    }

    let mailOptions = {
      form: "pywsddbol2@gmail.com",
      to: `${email}`,
      subject: `OTP : ${otp}`,
    };
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(`error email ${err}`);
      } else {
        console.log(`send otp to ${email}`);
        return res.status(200).json("send email success");
      }
    });

    try {
     const data = await ForgetPass.create({ email: email, otp: otp }); 
     
    
     setTimeout(async () => {
       await ForgetPass.findByIdAndDelete(data.id);
        console.log(`otp delete complete ${email}`);
      }, 30000);
      res.send(data);
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});


module.exports = router;
