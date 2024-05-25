const MealPlan = require('../models/meal.model');

async function calculateCarbonFootPrint(req, res) {
    try {
        // Find all meal plans of the user
        const mealPlans = await MealPlan.find({ user: req.user });

        if (!mealPlans || mealPlans.length === 0) {
            return res.status(404).json({ message: 'No meal plans found for the user' });
        }

        // Extract recipes from each meal plan
        const allRecipes = mealPlans.reduce((recipes, mealPlan) => {
            return recipes.concat(mealPlan.recipes || []);
        }, []);

        res.status(200).json({ recipes: allRecipes });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = { calculateCarbonFootPrint };
