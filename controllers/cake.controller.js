const fse = require('fs-extra')
const formidable = require('formidable')
const Datastore = require('nedb')
const db = new Datastore({
  filename: './collections/cakes.db',
  autoload: true,
})

db.ensureIndex({ fieldName: 'name', unique: true }, function (err) {})
db.ensureIndex({ fieldName: 'id', unique: true }, function (err) {})

function insertCake(newCake, res) {
  db.insert(newCake, function (err, newDoc) {
    if (err) {
      console.log(err)
      return res.status(400).json(err.message)
    }
    console.log(newDoc)
    return res.status(201).json('Photo added')
  })
}

exports.addCake = (req, res) => {
  let form = new formidable.IncomingForm()
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Cake could not be uploaded',
      })
    }
    console.log(fields)
    let cake = {}
    cake.name = fields.name
    cake.comment = fields.comment

    if (!fields.comment) {
      return res.status(400).json({
        error: 'Please write a comment about your cake.',
      })
    }

    if (!fields.name) {
      return res.status(400).json({
        error: 'Please choose a name for your cake.',
      })
    }

    if (!fields.yumFactor) {
      return res.status(400).json({
        error: 'Please provide a yum factor.',
      })
    }

    if (!files.photo) {
      return res.status(400).json({
        error: 'Please select a photo to upload',
      })
    }

    let photoBuffer = fse.readFileSync(files.photo.path)
    let fileExtension = files.photo.type.slice(6)
    let fileName = cake.name.split(' ').join('')

    let imageUrl = `http://${req.get(
      'Host',
    )}/photos/${fileName}.${fileExtension}`
    cake.imageUrl = imageUrl
    fse.outputFileSync(
      __dirname + `/../photos/${fileName}.${fileExtension}`,
      photoBuffer,
    )

    insertCake(cake, res)
  })
}

exports.dbpointer = db
