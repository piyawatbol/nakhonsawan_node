const mongoose = require("mongoose");

const Appeal = new mongoose.Schema({
    uid : String,
    first_name : String,
    last_name : String,
    id_card: String,
    phone: String,
    latitude: String,
    longtitude: String,
    address_detail: String,
    type: String,
    title: String,
    appeal_detail: String,
    date: String,
    time: String,
});

module.exports = mongoose.model("Appeal", Appeal);
