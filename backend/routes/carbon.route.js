
const express = require("express")
const routes = express.Router()

const {calculateCarbonFootPrint} = require('../controller/carbon.controller')

routes.use(express.json())
routes.use(express.urlencoded({extended: true}))

routes.post('/',calculateCarbonFootPrint)

module.exports = routes