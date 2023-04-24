const mongoose = require("mongoose");

const ForgetPass = new mongoose.Schema({
  email: String,
  otp: String,
});

module.exports = mongoose.model("ForgetPass", ForgetPass);
