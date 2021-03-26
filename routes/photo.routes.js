const express = require('express')
const router = express.Router()

const { photoById, showPhoto } = require('../controllers/photo.controller')

router.get('/:photoId', showPhoto)

router.param('photoId', photoById)

module.exports = router
