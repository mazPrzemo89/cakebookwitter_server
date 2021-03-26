const express = require('express')
const {
  addCake,
  deleteCake,
  getCakeData,
  cakeById,
} = require('../controllers/cake.controller')
const router = express.Router()
router.get('/:cakeId', getCakeData)
router.post('/', addCake)
router.delete('/delete/:cakeId', deleteCake)

router.param('cakeId', cakeById)

module.exports = router
