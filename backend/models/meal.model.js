const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema({
    user: {
        type: String,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    recipes: [{
        type: [String],
        ref: 'Receipe'
    }],
    date: {
        type: Date, 
        default: Date.now
    }
});

const MealPlan = mongoose.model('MealPlan', mealPlanSchema);

module.exports = MealPlan;
