const { urlencoded } = require('body-parser')
const express= require('express')
const { getAllRecipies, getRecipeById, searchRecipes, addRecipe } = require('../controller/receipe.controller')
const { protect } = require('../middleware/auth')

const routes=express.Router()

routes.use(express.json())
routes.use(urlencoded({extended:true}))


routes.get('/',protect,getAllRecipies);
routes.get('/:id',protect,getRecipeById);
routes.get('/search/:id',protect,searchRecipes);
routes.post('/',protect,addRecipe)

module.exports=routes;