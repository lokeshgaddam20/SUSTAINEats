const {urlencoded} = require('body-parser')
const express = require('express')
const routes = express.Router()
const {urlencoded} = require('body-parser')

routes.use(express.json())
routes.use(express.urlencoded({extended: true}))

routes.post('/',postMealPlan)
routes.get('/:id',getMealPlanById)
routes.put('/:id',updateMealPlan)
routes.delete('/:id',deleteMealPlan)

module.exports = routes