const mongoose = require("mongoose");

const UrgentContact = new mongoose.Schema({
  name: String,
  detail: String,
  phone: String,
  image : String,
},{timestamps : true});

module.exports = mongoose.model("UrgentContact", UrgentContact);