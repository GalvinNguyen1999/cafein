const express = require('express')
const userRoure = require('./routes/user.route')
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

app.use('/users', userRoure)

app.listen(port, () => {
  console.log(`Server running:  http://localhost:${port}`)
})
