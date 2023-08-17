const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Notify = new mongoose.Schema({
    user_id : String,
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
    status: {
        type: String,
        enum: ["รอตรวจสอบ", "กำลังตำเนินการ", "ดำเนินการเสร็จสิ้น"],
        default: "รอตรวจสอบ",
      },
},{timestamps : true});

module.exports = mongoose.model("Notify", Notify);