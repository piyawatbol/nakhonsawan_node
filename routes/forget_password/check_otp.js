const express = require("express");
const router = express.Router();
const ForgetPass = require("../../models/ForgetPass");


router.post('/',async (req, res) => {
    const { email, otp } = req.body;
    try {
        const data = await ForgetPass.findOne({email: email,otp: otp});   
        if(!data){
            res.status(401).send('in correct');
        }
        res.status(200).send('correct');
        console.log(data);
      } catch (err) {
        console.log(err);
      }
})

module.exports = router;