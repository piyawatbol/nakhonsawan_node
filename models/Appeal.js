const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Appeal = new mongoose.Schema({
    uid: { type: Schema.Types.ObjectId,ref: 'User' },
    latitude: String,
    longtitude: String,
    address_detail: String,
    type: String,
    title: String,
    appeal_detail: String,
    status : String,
    comment : [
        {
            comment_id : {type: Schema.Types.ObjectId},
            uid: { type: Schema.Types.ObjectId,ref: 'User' },
            comment: String,
            comment_date_time: {
                type: Date,
                default: Date.now
            },
            reply : [
                {
                  uid: { type: Schema.Types.ObjectId,ref: 'User' },
                  comment: String,
                  comment_date_time: {
                      type: Date,
                      default: Date.now
                  },
                }
            ]
        }
    ],
    date_time : {
        type: Date,
        default: Date.now
    }
});




module.exports = mongoose.model("Appeal", Appeal);