const express = require('express')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)
// Set some defaults
db.defaults({ users: [] })
  .write()

const dbUsers = db.get('users')

const app = express()
const port = 8017

// translate req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'pug')
app.set('views', './views')

app.get('/', (req, res) => {
  res.render('index', {
    name: 'Cuong Dev'
  })
})

app.get('/users', (req, res) => {
  res.render('users/index', {
    users: dbUsers.value()
  })
})

app.get('/users/search', (req, res) => {
  const q = req.query.q
  const matchUserList = dbUsers.value().filter((user) => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1 )
  res.render('users/index', {
    users: matchUserList,
    valueInput: q
  })
})

app.get('/users/create', (req, res) => {
  res.render('users/create')
})

app.post('/users/create', (req, res) => {
  db.get('users').push(req.body).write()
  res.redirect('/users')
})

app.listen(port, () => {
  console.log(`Server running:  http://localhost:${port}`)
})
