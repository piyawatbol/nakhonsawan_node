const mongoose = require("mongoose");

const NewsRelease = new mongoose.Schema({
    image: String,
    title: String,
    type: String,
    file: String,
},{ timestamps: true }
);

module.exports = mongoose.model("NewsRelease", NewsRelease);
