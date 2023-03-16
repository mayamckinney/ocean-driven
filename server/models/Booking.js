 
 
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
    startTime: {
        type: String,
        required: true,
        default: '06:00'
    },
    endTime: {
        type: String,
        required: true,
        default: '18:00'
    },
    user: {
        type: String,
        required: true
    }
})


module.exports = bookingSchema