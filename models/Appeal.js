const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Appeal = new mongoose.Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    latitude: String,
    longtitude: String,
    address_detail: String,
    type: String,
    title: String,
    appeal_detail: String,
    status: {
      type: String,
      enum: ["รอตรวจสอบ", "กำลังตำเนินการ", "ดำเนินการเสร็จสิ้น"],
      default: "รอตรวจสอบ",
    },
    comment: [
      {
        user_id: { type: Schema.Types.ObjectId, ref: "User" },
        comment: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
        reply: {
          type: [
            {
              user_id: { type: Schema.Types.ObjectId, ref: "User" },
              comment: {
                type: String,
              },
              createdAt: {
                type: Date,
                default: Date.now,
              },
            },
          ],
          default: [],
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appeal", Appeal);
