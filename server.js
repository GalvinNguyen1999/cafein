const express = require('express')
const app = express()
const port = 8017

// translate req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const users = [
  { name: 'Cuong', age: 24 },
  { name: 'Luan', age: 23 },
  { name: 'Phuc', age: 22 }
]

app.set('view engine', 'pug')
app.set('views', './views')

app.get('/', (req, res) => {
  res.render('index', {
    name: 'Cuong Dev'
  })
})

app.get('/users', (req, res) => {
  res.render('users/index', {
    users: users
  })
})

app.get('/users/search', (req, res) => {
  const q = req.query.q
  const matchUserList = users.filter((user) => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1 )
  res.render('users/index', {
    users: matchUserList,
    valueInput: q
  })
})

app.get('/users/create', (req, res) => {
  res.render('users/create')
})

app.post('/users/create', (req, res) => {
  users.push(req.body)
  res.redirect('/users')
})

app.listen(port, () => {
  console.log(`Server running:  http://localhost:${port}`)
})
