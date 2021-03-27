const express = require('express')
const router = express.Router()

const {
  addCake,
  deleteCake,
  getCakeData,
  getAllCakes,
  cakeById,
} = require('../controllers/cake.controller')

router.get('/all', getAllCakes)
router.get('/:cakeId', getCakeData)
router.post('/', addCake)
router.delete('/delete/:cakeId', deleteCake)

router.param('cakeId', cakeById)

module.exports = router
