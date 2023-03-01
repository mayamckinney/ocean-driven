const { Schema, model } = require('mongoose')

const featureSchema = new Schema({
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
    other: [String]
})

const boatSchema = new Schema({
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
    features: featureSchema
})

const Boat = model('Boat', boatSchema)

module.exports = Boat