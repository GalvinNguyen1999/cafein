module.exports.postCreate = (req, res, next) => {
  const errors = []

  if (!req.body.name) {
    errors.push('Name is require')
  }

  if (!req.body.age) {
    errors.push('Age is require')
  }

  if (!req.body.phone) {
    errors.push('Phone is require')
  }

  if (errors.length) {
    res.render('users/create', {
      errors: errors,
      values: req.body
    })
    return
  }

  next()
}
