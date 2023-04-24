const mongoose = require("mongoose");

const ConfiscatedItem = new mongoose.Schema({
    name: String,
    fine: String,
    address: String,
    image: String,
    date: String,
    time: String,
});

module.exports = mongoose.model("ConfiscatedItem", ConfiscatedItem);
