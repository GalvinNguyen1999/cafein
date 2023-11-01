const express = require('express')
const shortid = require('shortid');
const db = require('../db')

const route = express.Router()
const dbUsers = db.get('users')

route.get('/', (req, res) => {
  res.render('users/index', {
    users: dbUsers.value()
  })
})

route.get('/search', (req, res) => {
  const q = req.query.q
  const matchUserList = dbUsers.value().filter((user) => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1 )
  res.render('users/index', {
    users: matchUserList,
    valueInput: q
  })
})

route.get('/create', (req, res) => {
  res.render('users/create')
})

route.get('/:id', (req, res) => {
  const id = req.params.id
  const users = dbUsers.filter((u) => u.id === id).value()
  res.render('users/view', {
    users: users
  })
})

route.post('/create', (req, res) => {
  req.body.id = shortid.generate() 
  db.get('users').push(req.body).write()
  res.redirect('/users')
})

module.exports = route
