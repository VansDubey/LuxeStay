const mongoose = require('mongoose')
const {Schema} = mongoose;

const placeSchema = new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    name:String,
    address:String,
    photos:[String],
    description:String,
    perks:[String],
    checkIn:Number,
    checkOut:Number,
    maxGuests:Number,
    price:Number,
    availability:Boolean,
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review"
    }]
}, { timestamps: true })

module.exports = mongoose.model("Place", placeSchema);