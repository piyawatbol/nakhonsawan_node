const mongoose = require("mongoose");

const ConfiscatedItem = new mongoose.Schema({
    name: String,
    fine: String,
    address: String,
    image: String,
   
},{timestamps : true});

module.exports = mongoose.model("ConfiscatedItem", ConfiscatedItem);