const { urlencoded } = require('body-parser')
const express = require("express")
const app = express()

routes.use(express.json())
routes.use(express.urlencoded({extended: true}))

app.post('/',calculateCarbonFootPrint)

module.exports = routes