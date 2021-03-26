const fs = require('fs')
const { dbopinter } = require('../datastore')

exports.photoById = (req, res, next, id) => {
  dbopinter.find({ id: id }, function (err, docs) {
    if (err) {
      return res.status(400).json({
        error: 'Photo not found',
      })
    }
    req.cake = docs[0]
    next()
  })
}

exports.showPhoto = (req, res) => {
  console.log(req.cake)
  let photo = fs.readFileSync(__dirname + `${req.cake.outputFile}`)
  res.set('Content-Type', 'image/png')
  res.send(photo)
}
