const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
// Set some defaults
db.defaults({ users: [], sessions: [] })
  .write()

module.exports = db  