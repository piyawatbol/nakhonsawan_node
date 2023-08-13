const mongoose = require("mongoose");

const Municipal = new mongoose.Schema({
  icon: String,
  title: String,
  subtitle: String, 
  agency: String,
  form_file: Array
});


module.exports = mongoose.model("Municipal", Municipal);