const { urlencoded } = require('body-parser')
const express = require(express)
const routes = express.Router()

routes.use(express.json())
routes.use(express.urlencoded({extended: true}))

routes.get('/',getAllFoods)
routes.get('/:id',getFoodbyID)
routes.get('/search',getFood)
routes.get('/seasonal',getSeasonalFood)

module.exports = routes