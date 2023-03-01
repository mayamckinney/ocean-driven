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
    bookedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Booking = model('Booking', bookingSchema)

module.exports = Booking