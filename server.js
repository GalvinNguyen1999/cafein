const express = require('express')
const dotenv = require('dotenv')
var cors = require('cors')
var cookieParser = require('cookie-parser')
const userRoute = require('./routes/user.route')
const authRoute = require('./routes/auth.route')
const productRoute = require('./routes/product.route')
const cardRoute = require('./routes/card.route')

const authMiddlerware = require('./middlewares/auth.middleware')
const sessionsMiddlerware = require('./middlewares/sessions.middleware')

const app = express()
const port = 8017
dotenv.config()
// translate req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(cookieParser(process.env.SESSION_SECRET))
app.use(sessionsMiddlerware)
app.use(cors())

app.set('view engine', 'pug')
app.set('views', './views')

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/cookie', (req, res) => {
  res.cookie('user-id', 12345)
  res.send('Goodbye world!')
})

app.use('/users', authMiddlerware.requireAuth , userRoute)
app.use('/auth', authRoute)
app.use('/product', productRoute)
app.use('/card', cardRoute)

app.listen(port, () => {
  console.log(`Server running:  http://localhost:${port}`)
})
