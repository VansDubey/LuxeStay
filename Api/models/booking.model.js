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
    checkin:String,
    checkout:String,
    guests:Number,
    name:String,
    mobile:Number,
    price:Number
   
})

module.exports = mongoose.model("Booking", bookingSchema);