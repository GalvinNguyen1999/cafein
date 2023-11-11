const db = require('../db')

module.exports.addCard = (req, res, next) => {
  const productId = req.params.productId
  const sessionId = req.signedCookies.sessionId

  if (!sessionId) {
    res.redirect('/product')
    return
  }

  const count = db.get('sessions')
                  .find({ id: sessionId})
                  .get('card.' + productId, 0)
                  .value()

  db.get('sessions')
    .find({ id: sessionId})
    .set('card.' + productId, count + 1)
    .write()

  res.redirect('/product')
}
