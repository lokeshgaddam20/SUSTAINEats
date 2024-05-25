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

foodSchema.pre('save', function(next) {
    if (this.season) {
        this.season = this.season.toLowerCase();
    }
    next();
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
