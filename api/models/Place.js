const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    mainImage: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rate: {
        type: Number,
        default: 0.0,
        maximum: 5.0
    },
});

const Place = mongoose.model('Place', PlaceSchema);
module.exports = Place;