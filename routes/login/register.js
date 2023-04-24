const express = require('express');
const router = express.Router();
const Users = require('../../models/Users');

router.post('/',async (req, res) => {
    try {
        const data = await Users.create(req.body);
        res.status(200).send([{"data":data}]);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
})

router.post('/check',async (req, res) => {
  const id_card = req.body.id_card;
  const email = req.body.email;
  const phone = req.body.phone;

  try {
      const data = await Users.findOne({id_card : id_card});
      if(data != null){
        res.status(201).send('card id duplicate');
      }else{
        const data = await Users.findOne({email : email});
        if(data != null){
          res.status(202).send('email duplicate');
        }else{
          const data = await Users.findOne({phone : phone});
          if(data != null){
            res.status(203).send('phone duplicate');
          }else{
            res.status(200).send('not duplicate');
          }
        }
      }

    } catch (err) {
      console.log(err);
    }
})

module.exports = router;