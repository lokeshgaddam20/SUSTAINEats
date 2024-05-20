const { urlencoded } = require('body-parser')
const exp = require('constants')
const express= require('express')


const routes=express.Router()

routes.use(express.json())
routes.use(urlencoded({extended:true}))


routes.get('/recipies',getAllRecipies);
routes.get('/recipies/:id',getCertailRecipies);
routes.get('/recipies/search',recipieSearch);


module.exports=routes;