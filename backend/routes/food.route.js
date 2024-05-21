const { urlencoded } = require('body-parser')
const express = require('express')
const routes = express.Router()
const { getAllFoods, getFood, getFoodbyID, getSeasonalFood}=require('../controller/food.controller')

routes.use(express.json())
routes.use(express.urlencoded({extended: true}))

routes.get('/',getAllFoods)
routes.get('/:id',getFoodbyID)
routes.get('/search/:id',getFood)

module.exports = routes