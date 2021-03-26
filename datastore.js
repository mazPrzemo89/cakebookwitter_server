const Datastore = require('nedb')
const db = new Datastore({
  filename: './collections/cakes.db',
  autoload: true,
})

db.ensureIndex({ fieldName: 'name', unique: true }, function (err) {})
db.ensureIndex({ fieldName: 'id', unique: true }, function (err) {})

exports.dbopinter = db
