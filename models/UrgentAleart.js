const mongoose = require("mongoose");

const UrgentAleart = new mongoose.Schema({
  title: String,
  detail: String,
  type: String,
  image: Array,
},{timestamps : true});

module.exports = mongoose.model("UrgentAleart", UrgentAleart);