 
 
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
    // startTime: {
    //     type: String,
    //     required: true,
    //     default: '06:00'
    // },
    // endTime: {
    //     type: String,
    //     required: true,
    //     default: '18:00'
    // },
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