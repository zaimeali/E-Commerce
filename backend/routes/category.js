const express = require('express')
const router = express.Router()

// Controller
const { getAllCategory } = require('../controllers/category')

router.param("categoryId", getAllCategory)

module.exports = router