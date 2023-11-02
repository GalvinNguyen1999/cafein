const express = require('express')
const controllers = require('../controllers/user.controller') 
const validate = require('../middlewares/user.validate')

const route = express.Router()

route.get('/', controllers.index)

route.get('/search', controllers.search)

route.get('/create', controllers.create)

route.get('/:id', controllers.get)

route.post('/create', validate.postCreate , controllers.postCreate)

module.exports = route
