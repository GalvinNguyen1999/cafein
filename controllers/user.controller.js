const db = require('../db')
const shortid = require('shortid');
const md5 = require('md5')
const dbUsers = db.get('users')

module.exports.index = (req, res) => {
  res.render('users/index', {
    users: dbUsers.value()
  })
}

module.exports.search = (req, res) => {
  const q = req.query.q
  const matchUserList = dbUsers.value().filter((user) => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1 )
  res.render('users/index', {
    users: matchUserList,
    valueInput: q
  })
}

module.exports.create = (req, res) => {
  res.render('users/create')
}

module.exports.get = (req, res) => {
  const id = req.params.id
  const users = dbUsers.filter((u) => u.id === id).value()
  res.render('users/view', {
    users: users
  })
}

module.exports.postCreate = (req, res) => {
  req.body.id = shortid.generate()
  req.body.password = md5(req.body.password)
  console.log(req.body);
  db.get('users').push(req.body).write()
  res.redirect('/users')
}
