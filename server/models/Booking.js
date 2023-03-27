 
 
 const { Schema, model } = require('mongoose')

const bookingSchema = new Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    hours: {
        type: Number,
        required: true,
        default: 4
    },
    passengers: {
        type: Number,
        required: true,
        default: 1
    },
    user: {
        type: String,
        required: true
    }
})


module.exports = bookingSchema