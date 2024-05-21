const { urlencoded } = require('body-parser')
const exp = require('constants')
const express= require('express')
const { getAllRecipies, getCertailRecipies, recipieSearch } = require('../controller/receipe.controller')

const routes=express.Router()

routes.use(express.json())
routes.use(urlencoded({extended:true}))


routes.get('/',getAllRecipies);
routes.get('/:id',getCertailRecipies);
routes.get('/search/:id',recipieSearch);


module.exports=routes;