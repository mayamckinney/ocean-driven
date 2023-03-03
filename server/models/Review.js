const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
    reviewText: {
        type: String,
        required: true,
        minlength: 6
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // may add getter util to adjust date
    },
    reviewAuthor: {
        type: String,
        required: true
    }
});

module.exports = reviewSchema