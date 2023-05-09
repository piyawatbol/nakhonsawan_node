const mongoose = require("mongoose");


const Notify = new mongoose.Schema({
    uid : String,
    first_name : String,
    last_name : String,
    id_card: String,
    phone: String,
    latitude: String,
    longtitude: String,
    address_detail: String,
    type: String,
    level: String,
    notify_detail: String,
    image: Array,
    date_time : {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Notify", Notify);
