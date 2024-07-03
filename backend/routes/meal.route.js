const express = require('express')
const routes = express.Router()
const {getMealPlan,createMealPlan,updateMealPlan,deleteMealPlan, getRecipesByMealName, addRecipeToMeal} = require('../controller/meal.controller')

const { protect } = require('../middleware/auth')

routes.use(express.json())
routes.use(express.urlencoded({extended: true}))

routes.get('/', protect ,getMealPlan)
routes.post('/', protect ,createMealPlan)
routes.put('/:name', protect ,updateMealPlan)
routes.delete('/:name', protect ,deleteMealPlan)
routes.get('/:mealName/recipes', protect, getRecipesByMealName);
routes.put("/recipe/add-recipe", protect, addRecipeToMeal);

module.exports = routes