const mongoose = require("mongoose");

const HomeCourasel = new mongoose.Schema({
  name: String,
  image: String,
},{timestamps : true});

module.exports = mongoose.model("HomeCourasel", HomeCourasel);