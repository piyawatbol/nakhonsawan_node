const mongoose = require("mongoose");

const Journal = new mongoose.Schema({
  image: String,
  title: String,
  type: Array,
  period: String,
  date_time: {
    type: Date,
    default: Date.now,
  },
  file: String,
});

module.exports = mongoose.model("Journal", Journal);
