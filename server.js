const express = require('express')
const app = express()
const port = 8017

app.set('view engine', 'pug')
app.set('views', './views')

app.get('/', (req, res) => {
  res.render('index', {
    name: 'Cuong Dev'
  })
})

app.get('/users', (req, res) => {
  res.render('users/index', {
    users: [
      { name: 'Cuong', age: 24 },
      { name: 'Luan', age: 23 },
      { name: 'Phuc', age: 22 }
    ]
  })
})

app.listen(port, () => {
  console.log(`Server running:  http://localhost:${port}`)
})
