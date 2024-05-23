const express = require('express')
const routes = express.Router()
const {getMealPlan,createMealPlan,updateMealPlan,deleteMealPlan} = require('../controller/meal.controller')

const { protect } = require('../middleware/auth')

routes.use(express.json())
routes.use(express.urlencoded({extended: true}))

routes.get('/', protect ,getMealPlan)
routes.post('/', protect ,createMealPlan)
routes.put('/:name', protect ,updateMealPlan)
routes.delete('/:name', protect ,deleteMealPlan)

module.exports = routes