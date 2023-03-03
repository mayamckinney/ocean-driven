const { Schema, model } = require('mongoose')

const bookingSchema = new Schema({
    from: {
        type: Date,
        required: true
    },
    to: {
        type: Date,
        required: true
    },
    user: {
        type: String,
        required: true
    }
})


module.exports = bookingSchema