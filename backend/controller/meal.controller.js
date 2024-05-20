const mealModel = require('../models/meal.model');

async function getMealPlanById(req, res) {
    try {
        const meal = await mealModel.find();
        res.json(meal);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function postMealPlan(req, res) {
    const user = req.params.user;
    const { name, recipes, date } = req.body;
    try {
        const newMeal = await mealModel.create({ user, name, recipes, date });
        res.status(200).json(newMeal);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

async function updateMealPlan(req, res) {
    const userId = req.params.user;
    const { name, recipes, date } = req.body;
    const docs = await mealModel.findOne({ user: userId })
    console.log(docs);
    try {
        const meal = await mealModel.findByIdAndUpdate(docs._id, {userId, name, recipes, date }, { new: true });
        res.json(meal);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
async function deleteMealPlan(req, res) {
    const userId = req.params.user;
    const docs = await mealModel.findOne({ user: userId })
    try {
        await mealModel.findByIdAndDelete(docs._id);
        res.json({ message: 'Meal deleted' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { postMealPlan, getMealPlanById, updateMealPlan, deleteMealPlan };