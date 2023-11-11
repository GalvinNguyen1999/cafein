const express = require('express')
const controllers = require('../controllers/card.controller') 

const route = express.Router()

route.get('/add/:productId', controllers.addCard)

module.exports = route
