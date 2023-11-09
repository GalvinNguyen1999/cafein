const express = require('express')
const controllers = require('../controllers/product.controller') 

const route = express.Router()

route.get('/', controllers.index)

module.exports = route
