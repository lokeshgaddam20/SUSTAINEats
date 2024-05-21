const { urlencoded } = require('body-parser')
const express= require('express')

const routes=express.Router()

const {signupAction,loginAction,logoutAction}=require('../controller/auth.controller')

routes.use(express.json())
routes.use(urlencoded({extended:true}))

routes.post('/signup',signupAction);
routes.post('/login',loginAction);
routes.post('/logout',logoutAction);


module.exports=routes;