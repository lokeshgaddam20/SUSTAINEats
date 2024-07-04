const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    recipes: [
        {
            type: String,
            ref: 'Recipe'
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
 } , { timestamps: true });

const MealPlan = mongoose.model('MealPlan', mealPlanSchema);

module.exports = MealPlan;
