const db = require('../db')
const shortid = require('shortid');
const dbUsers = db.get('users')

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

  if (user.password !== password) {
    res.render('auth/login.pug', {
      errors: [
        'Wrong password !'
      ],
      values: req.body
    })
    return
  }
  
  res.cookie('userID', user.id)
  res.redirect('/users')
}

