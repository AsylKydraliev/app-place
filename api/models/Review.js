const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    foodRating: {
        type: Number,
        default: 0.0,
        maximum: 5.0
    },
    serviceRating: {
        type: Number,
        default: 0.0,
        maximum: 5.0
    },
    interiorRating: {
        type: Number,
        default: 0.0,
        maximum: 5.0
    },
    place: {
        type: Schema.Types.ObjectId,
        ref: 'Place',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;