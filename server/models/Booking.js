 
 
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
        required: true
    },
    passengers: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true
    }
})


module.exports = bookingSchema