const express = require('express')
const controllers = require('../controllers/user.controller') 
const validate = require('../validate/user.validate')
const multer  = require('multer')

const upload = multer({ dest: './public/uploads/' })

const route = express.Router()

route.get('/', controllers.index)

route.get('/search', controllers.search)

route.get('/create', controllers.create)

route.get('/:id', controllers.get)

route.post('/create',  upload.single('avatar'), validate.postCreate , controllers.postCreate)

module.exports = route
