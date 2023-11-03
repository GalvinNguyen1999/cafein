const express = require('express')
const userRoure = require('./routes/user.route')
var cookieParser = require('cookie-parser')

const app = express()
const port = 8017

// translate req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(cookieParser())

app.set('view engine', 'pug')
app.set('views', './views')

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/cookie', (req, res) => {
  res.cookie('user-id', 12345)
  res.send('Goodbye world!')
})

app.use('/users', userRoure)

app.listen(port, () => {
  console.log(`Server running:  http://localhost:${port}`)
})
