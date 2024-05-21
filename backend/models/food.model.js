const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    sustainabilityRating: {
        type: Number,
        required: true
    },
    season: {
        type: String,
        required: true
    }
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
