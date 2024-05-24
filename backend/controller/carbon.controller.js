const MealPlan = require('../models/meal.model');

async function calculateCarbonFootPrint(req, res) {
    try {
       const find=req.params.find
        const data = await MealPlan.findOne({ user: req.user, name: find },'recipes');
        
        if (!data) {
            return res.status(404).json({ message: 'Meal plan not found' });
        }

        res.status(200).json(data.recipes);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = { calculateCarbonFootPrint };
