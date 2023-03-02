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
    reviewBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Review = model('Review', reviewSchema);

module.exports = Review