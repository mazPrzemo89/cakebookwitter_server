const fs = require('fs')
const { dbpointer } = require('../datastore')

exports.photoById = (req, res, next, id) => {
  dbpointer.find(
    { id: id },
    { outputFile: 1, fileExtension: 1, _id: 0 },
    function (err, docs) {
      if (err) {
        return res.status(400).json(err.message)
      }
      if (docs.length === 0) {
        return res.status(404).json('Cake not found')
      }
      req.cake = docs[0]
      next()
    },
  )
}

exports.showPhoto = (req, res) => {
  let photo = fs.readFileSync(__dirname + `${req.cake.outputFile}`)
  res.set('Content-Type', `image/${req.cake.fileExtension}`)
  res.send(photo)
}
