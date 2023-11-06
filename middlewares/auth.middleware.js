const db = require('../db')
const dbUsers = db.get('users')

module.exports.requireAuth = (req, res, next) => {
  const userID = req.signedCookies.userID

  if (!userID) {
    res.render('auth/login', {
      errors: [
        'Login Wrong'
      ],
      values: req.body
    })

    return
  }

  const user = dbUsers.find({ id: req.signedCookies.userID }).value()

  if (!user) {
    res.render('auth/login', {
  errors: [
        'User not valid'
      ],
      values: req.body
    })

    return
  }

  res.locals.user = user
  next()
}
