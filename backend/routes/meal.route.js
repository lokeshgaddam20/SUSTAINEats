const express = require('express')
const routes = express.Router()
const {getMealPlanById,createMealPlan,updateMealPlan,deleteMealPlan} = require('../controller/meal.controller')

const { protect } = require('../middleware/auth')

routes.use(express.json())
routes.use(express.urlencoded({extended: true}))

routes.get('/', protect ,getMealPlanById)
routes.post('/', protect ,createMealPlan)
routes.put('/:user', protect ,updateMealPlan)
routes.delete('/:user', protect ,deleteMealPlan)

module.exports = routes