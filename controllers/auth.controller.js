const db = require('../db')
const dbUsers = db.get('users')
const md5 = require('md5');

module.exports.index = (req, res) => {
  res.render('auth/login')
}

module.exports.postLogin = (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const user = dbUsers.find({ email: email }). value()

  if (!user) {
    res.render('auth/login.pug', {
      errors: [
        'User is not valid !'
      ],
      values: req.body
    })
    return
  }

  const hashPassword = md5(password)

  if (user.password !== hashPassword) {
    res.render('auth/login.pug', {
      errors: [
        'Wrong password !'
      ],
      values: req.body
    })
    return
  }
  
  res.cookie('userID', user.id, {
    signed: true
  })

  res.redirect('/users')
}

