const shortid = require('shortid');
const db = require('../db')

module.exports = (req, res, next) => {
  const sessionCookie = req.signedCookies.sessionId
  
  if (!sessionCookie) {
    const sessionId = shortid.generate()
    res.cookie('sessionId', sessionId, { signed: true })
    
    db.get('sessions').push({ id: sessionId }).write()
  }
  
  const cartTotal = db.get('sessions')
                      .find({ id: sessionCookie })
                      .value()

  const sum = Object.values(cartTotal.card).reduce((a, b) => a + b, 0);                    
  
  res.locals.sum = sum

  next()
}
