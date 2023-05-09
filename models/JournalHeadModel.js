const mongoose = require("mongoose");

const JournalHead = new mongoose.Schema({
  title: String,
  icon: String,
});

module.exports = mongoose.model("Journal_Head", JournalHead);
