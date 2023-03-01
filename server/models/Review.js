const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
    reviewText: {
        type: String,
        required: true,
        min: 6
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // may add getter util to adjust date
    },
    username: {
        type: String,
        required: true
    }
})