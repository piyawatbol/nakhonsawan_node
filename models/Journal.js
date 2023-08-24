const mongoose = require("mongoose");

const Journal = new mongoose.Schema({
  title: String,
  detail: String,
  type: Array,
  image: Array,
},{timestamps : true});

module.exports = mongoose.model("Journal", Journal);