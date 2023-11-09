const db = require('../db')
const dbProduct = db.get('products')
const md5 = require('md5');

module.exports.index = (req, res) => {
  const page = parseInt(req.query.page) || 1
  const perPage = 8

  const drop = (page - 1) * perPage
  
  res.render('product/index.pug', {
    products: dbProduct.drop(drop).take(perPage).value()
  })
}