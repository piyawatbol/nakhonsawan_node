const mongoose = require("mongoose");

const Municipal_Title = new mongoose.Schema({
  icon: String,
  title: String,
  subtitle: String, 
  agency: String,
  form_file: Array
});

module.exports = mongoose.model("Municipal_Title", Municipal_Title);
