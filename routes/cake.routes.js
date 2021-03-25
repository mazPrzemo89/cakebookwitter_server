const express = require('express')
const { addCake } = require('../controllers/cake.controller')
const router = express.Router()

router.post('/', addCake)

module.exports = router
