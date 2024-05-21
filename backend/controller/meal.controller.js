const MealPlan = require('../models/meal.model');
const Recipe = require('../models/receipe.model');


const createMealPlan = async (req, res) => {
    const { name } = req.body;
    const userId = req.user;
    try {
        // Fetch all recipes from the database
        const recipes = await Recipe.find({}, '_id'); // Fetch only the _id field
        
        // Extract recipe IDs as an array of strings
        const recipeIds = recipes.map(recipe => recipe._id.toString());
        
        // Create a new MealPlan instance with user ID, name, recipes, and date
        // const mealPlan = new MealPlan();
        
        // Save the new meal plan to the database
        const mealPlan=await MealPlan.create({ user: userId, name, recipes: recipeIds, date });
        
        res.json(mealPlan);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getMealPlans = async (req, res) => {
    try {
        const mealPlans = await MealPlan.find({ user: req.user._id }).populate('recipes');
        res.json(mealPlans);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getMealPlanById = async (req, res) => {
    try {
        const mealPlan = await MealPlan.findById(req.params.id).populate('recipes');
        if (!mealPlan) return res.status(404).json({ message: 'Meal plan not found' });
        res.json(mealPlan);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateMealPlan = async (req, res) => {
    const { name, recipes } = req.body;

    try {
        const mealPlan = await MealPlan.findById(req.params.id);
        if (!mealPlan) return res.status(404).json({ message: 'Meal plan not found' });

        mealPlan.name = name || mealPlan.name;
        mealPlan.recipes = recipes || mealPlan.recipes;
        await mealPlan.save();

        res.json(mealPlan);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteMealPlan = async (req, res) => {
    try {
        const mealPlan = await MealPlan.findById(req.params.id);
        if (!mealPlan) return res.status(404).json({ message: 'Meal plan not found' });

        await mealPlan.remove();
        res.json({ message: 'Meal plan deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { createMealPlan, getMealPlans, getMealPlanById, updateMealPlan, deleteMealPlan };
