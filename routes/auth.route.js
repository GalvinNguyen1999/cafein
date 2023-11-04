const express = require('express')
const controllers = require('../controllers/auth.controller') 

const route = express.Router()

route.get('/login', controllers.index)

route.post('/login', controllers.postLogin)

module.exports = route
