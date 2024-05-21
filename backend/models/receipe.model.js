const mongoose = require('mongoose');

const receipeSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    sustainabilityRating: {
        type: Number,
        required: true
    }
});

const Receipe = mongoose.model('Receipe', receipeSchema);

module.exports = Receipe;
