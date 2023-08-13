const mongoose = require("mongoose");

const ConfiscatedItem = new mongoose.Schema({
    name: String,
    fine: String,
    address: String,
    image: String,
    date_time : {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("ConfiscatedItem", ConfiscatedItem);