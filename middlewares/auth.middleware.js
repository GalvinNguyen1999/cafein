const db = require('../db')
const dbUsers = db.get('users')

module.exports.requireAuth = (req, res, next) => {
  const userID = req.cookies.userID

  if (!userID) {
    res.render('auth/login', {
      errors: [
        'Login Wrong'
      ],
      values: req.body
    })

    return
  }

  const user = dbUsers.find({ id: userID }).value()

  if (!user) {
    res.render('auth/login', {
      errors: [
        'User not valid'
      ],
      values: req.body
    })

    return
  }

  next()
}
