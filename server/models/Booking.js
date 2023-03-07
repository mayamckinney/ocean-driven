 
 
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
    user: {
        type: String,
        required: true
    }
})


module.exports = bookingSchema