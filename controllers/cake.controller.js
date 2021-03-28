const fse = require('fs-extra')
const sharp = require('sharp')
const formidable = require('formidable')
const { dbpointer } = require('../datastore')

exports.addCake = (req, res) => {
  let form = new formidable.IncomingForm()
  form.parse(req, async (err, fields, files) => {
    let cake = {}

    if (err) {
      return res.status(400).json({
        error: 'Cake could not be uploaded',
      })
    }
    if (!fields.comment && !fields.name && !fields.id) {
      return res.status(400).json({
        error: 'Please fill all the fields.',
      })
    }

    if (!fields.name) {
      return res.status(400).json({
        error: 'Please choose a name for your cake.',
      })
    }
    if (fields.name.length > 20) {
      return res.status(400).json({
        error: 'Your cake name cannot be longer than 20 characters.',
      })
    }
    if (!fields.comment) {
      return res.status(400).json({
        error: 'Please write a comment about your cake.',
      })
    }

    if (fields.comment.length > 200) {
      return res.status(400).json({
        error: `Your comment cannot be longer than 200 characters. You commen`,
      })
    }

    if (!fields.id || fields.id < 0) {
      return res.status(400).json({
        error: 'Please provide a valid id.',
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

    cake.name = fields.name
    cake.comment = fields.comment
    cake.id = fields.id
    cake.yumFactor = fields.yumFactor

    let photoBuffer = fse.readFileSync(files.photo.path)
    let photoResized
    let fileExtension = files.photo.type.slice(6)

    await sharp(photoBuffer)
      .resize({ width: 272, height: 272, fit: 'fill' })
      .toBuffer()
      .then((data) => {
        photoResized = data
      })
      .catch((err) => {})

    let imageUrl = `http://${req.get('Host')}/photo/${cake.id}`
    cake.imageUrl = imageUrl
    cake.fileExtension = fileExtension
    cake.outputFile = `/../photos/${cake.id}.${fileExtension}`

    fse.outputFileSync(
      __dirname + `/../photos/${cake.id}.${fileExtension}`,
      photoResized,
    )

    insertCake(cake, res)
  })
}

exports.deleteCake = (req, res) => {
  dbpointer.remove({ id: req.cake.id }, {}, function (err, numRemoved) {
    if (err) {
      return res.status(400).json(err.message)
    }
  })

  dbpointer.persistence.compactDatafile()

  let path = __dirname + `/../photos/${req.cake.id}.${req.cake.fileExtension}`

  fse.unlink(path, (err) => {
    if (err) {
      return res.status(400).json(err.message)
    }
  })
  res.status(200).json('Deleted')
}

exports.getAllCakes = (req, res) => {
  dbpointer.find(
    {},
    { name: 1, comment: 1, yumFactor: 1, id: 1, imageUrl: 1, _id: 0 },
    function (err, docs) {
      if (err) {
        res.status(400).json(err.message)
      }
      return res.status(200).json(docs)
    },
  )
}

exports.getCakeData = (req, res) => {
  let cake = {}
  if (!req.cake) {
    res.status(404).json('No cake found')
  }
  res.status(200).json(req.cake)
}

exports.cakeById = (req, res, next, id) => {
  dbpointer.find({ id: id }, function (err, docs) {
    if (err) {
      return res.status(400).json({
        error: 'Photo not found',
      })
    }
    req.cake = docs[0]

    next()
  })
}

function insertCake(newCake, res) {
  dbpointer.insert(newCake, function (err, newDoc) {
    if (err) {
      return res.status(400).json({
        error: 'Id already exists. Please refresh your browser and try again.',
      })
    }
    return res.status(201).json('Photo added')
  })
}
