const { urlencoded } = require('body-parser')
const exp = require('constants')
const express= require('express')

const routes=express.Router()

routes.use(express.json())
routes.use(urlencoded({extended:true}))


routes.get('/signup',signupAction);
routes.get('/login',loginAction);
routes.get('/logout',logoutAction);


module.exports=routes;