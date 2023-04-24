const express = require("express");
const router = express.Router();
const https = require('https');

router.get('/request-otp', (req, res) => {
  const options = {
    hostname: 'otp.thaibulksms.com',
    path: '/v2/otp/request',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  const data = new URLSearchParams({
    'key': '1762979008483389',
    'secret': 'a5430ac53585d733dd6c65da263268a8',
    'msisdn': '0620623676'
  });

  const request = https.request(options, response => {
    let responseData = '';
    response.on('data', chunk => {
      responseData += chunk;
    });
    response.on('end', () => {
      res.send(responseData);
    });
  });

  request.on('error', error => {
    console.error(error);
    res.status(500).send('Error requesting OTP');
  });

  request.write(data.toString());
  request.end();
});

module.exports = router