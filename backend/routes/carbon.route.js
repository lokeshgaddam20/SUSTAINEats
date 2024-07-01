
const express = require("express")
const routes = express.Router()
const { protect } = require('../middleware/auth')

const {calculateCarbonFootPrint} = require('../controller/carbon.controller')

routes.use(express.json())
routes.use(express.urlencoded({extended: true}))

routes.post('/',protect,calculateCarbonFootPrint)

module.exports = routes