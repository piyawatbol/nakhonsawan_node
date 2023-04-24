const mongoose = require("mongoose");

const Municipal_Head = new mongoose.Schema({
  title: String,
  icon: String,
});

module.exports = mongoose.model("Municipal_Head", Municipal_Head);
