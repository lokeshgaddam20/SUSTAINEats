const express = require('express')
const routes = express.Router()
const {urlencoded} = require('body-parser')
const {getMealPlanById,postMealPlan,updateMealPlan,deleteMealPlan} = require('../controller/meal.controller')
routes.use(express.json())
routes.use(express.urlencoded({extended: true}))

routes.get('/',getMealPlanById)
routes.post('/:user',postMealPlan)
routes.put('/:user',updateMealPlan)
routes.delete('/:user',deleteMealPlan)

module.exports = routes