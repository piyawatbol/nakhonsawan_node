const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  uid: String,
  first_name: String,
  last_name: String,
  id_card : String,
  phone: String,
  email: String,
  pass_word: String,
  user_img: String,

});

module.exports = mongoose.model("User", UsersSchema);
