const express = require('express')
const routes = express.Router()
const { getAllFoods, getFood, getFoodbyID, getSeasonalFood, createFoods}=require('../controller/food.controller')
const { protect } = require('../middleware/auth')

routes.use(express.json())
routes.use(express.urlencoded({extended: true}))

routes.get('/',protect, getAllFoods)
routes.get('/:id',protect,getFoodbyID)
routes.get('/search/:id',protect,getFood)
routes.get('/seasonal/:season',protect,getSeasonalFood)

routes.post('/',protect, createFoods)

module.exports = routes