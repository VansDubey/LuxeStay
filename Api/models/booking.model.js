const mongoose = require('mongoose')
const {Schema} = mongoose;

const bookingSchema = new Schema({
    place:{
        type:Schema.Types.ObjectId,
        ref:"Place"
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    checkin:{ type: Date, required: true },
    checkout:{ type: Date, required: true },
    guests:Number,
    name:String,
    mobile:{ type: String, required: true },
    price:Number,
    createdAt:{ type: Date, default: Date.now }
})

module.exports = mongoose.model("Booking", bookingSchema);