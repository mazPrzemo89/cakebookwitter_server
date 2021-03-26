const fse = require('fs-extra')
const formidable = require('formidable')
const { dbopinter } = require('../datastore')

function insertCake(newCake, res) {
  dbopinter.insert(newCake, function (err, newDoc) {
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

    let cake = {}

    cake.name = fields.name
    cake.comment = fields.comment
    cake.id = fields.id
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

    if (!fields.id) {
      return res.status(400).json({
        error: 'Please provide an id.',
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

    let imageUrl = `http://${req.get('Host')}/photo/${cake.id}`
    cake.imageUrl = imageUrl

    cake.fileExtension = fileExtension
    cake.outputFile = `/../photos/${fileName}.${fileExtension}`

    fse.outputFileSync(
      __dirname + `/../photos/${fileName}.${fileExtension}`,
      photoBuffer,
    )

    insertCake(cake, res)
  })
}
