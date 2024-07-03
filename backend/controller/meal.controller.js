const MealPlan = require('../models/meal.model');
const Recipe = require('../models/receipe.model');


const createMealPlan = async (req, res) => {
    const { name } = req.body;
    const userId = req.user;
    try {
        // Fetch all recipes created by the user from the database
        const recipes = await Recipe.find({ user: userId, meal: name }, 'title');
        
         // Extract recipe IDs as an array of ObjectIds
         const recipeIds = recipes.map(recipe => recipe.title);

         // Create a new MealPlan instance with user ID, name, recipes, and date
         const mealPlan = await MealPlan.create({ user: userId, name, recipes: recipeIds });
 
         // Respond with the created meal plan
         res.json(mealPlan);
     } catch (err) {
         res.status(500).json({ error: err.message });
     }
 };

 const addRecipeToMeal = async (req, res) => {
    const { mealName, recipeTitle } = req.body;
  
    try {
      const meal = await MealPlan.findOne({ name: mealName });
      const recipe = await Recipe.findOne({ title: recipeTitle });
      console.log(meal);
  
      if (!meal) {
        return res.status(500).json({ message: "Meal not found" });
      }
  
      if (!recipe) {
        return res.status(500).json({ message: "Recipe not found" });
      }
      meal.recipes.push(recipeTitle);
      await meal.save();
  
      res.status(200).json({ message: "Recipe added to meal", meal });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };

 async function getMealPlan(req, res) {
    try {
        const meal = await MealPlan.find({user : req.user});
        res.json(meal);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// const getMealPlanById = async (req, res) => {
//     try {
//         const mealPlan = await MealPlan.findById(req.params.id).populate('recipes');
//         if (!mealPlan) return res.status(404).json({ message: 'Meal plan not found' });
//         res.json(mealPlan);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

const updateMealPlan = async (req, res) => {
    const { recipes } = req.body;

    try {
        const mealPlan = await MealPlan.findOneAndUpdate({user : req.user, name : req.params.name}, { recipes }, {new: true});
        if (!mealPlan) return res.status(404).json({ message: 'Meal plan not found' });

        res.json(mealPlan);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteMealPlan = async (req, res) => {
    const { recipes } = req.body;
    try {
        const mealPlan = await MealPlan.findOneAndUpdate({user: req.user, name : req.params.name}, {recipes}, {new: true});
        if (!mealPlan) return res.status(404).json({ message: 'Meal plan not found' });

        // await mealPlan.remove();
        res.json({ message: 'Meal plan deleted', mealPlan });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getRecipesByMealName = async (req, res) => {
    const { mealName } = req.params;
    try {
      const recipes = await Recipe.find({ meal: mealName, user: req.user });
      res.json(recipes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

module.exports = { getMealPlan, addRecipeToMeal, createMealPlan, updateMealPlan, deleteMealPlan, getRecipesByMealName };
