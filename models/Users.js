const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  uid: String,
  first_name: String,
  last_name: String,
  id_card: String,
  phone: String,
  email: String,
  password: String,
  user_img: String,
  token: String,
  login_type: String,
});

module.exports = mongoose.model("User", UsersSchema);
