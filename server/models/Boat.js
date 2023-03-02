const { Schema, model } = require('mongoose')

const boatSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    boatType: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    priceRate: {
        type: Number,
        required: true
    },
    booked: [{
        type: Schema.Types.ObjectId,
        ref: 'Booking'
    }],
    description: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    occupancy: {
        type: Number,
        required: true
    },
    foodServices: {
        type: Boolean,
        required: true
    },
    music: {
        type: Boolean,
        required: true
    },
    otherFeatures: [String]
})

const Boat = model('Boat', boatSchema)

module.exports = Boat