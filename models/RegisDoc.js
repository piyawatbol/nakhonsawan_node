const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RegisDoc = new mongoose.Schema({
  user_id: { type: Schema.Types.ObjectId,ref: 'User' },
  title : String,
  file : Array,
},{timestamps : true});

module.exports = mongoose.model("RegisDoc", RegisDoc);