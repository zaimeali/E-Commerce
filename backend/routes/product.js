const express = require('express')
const router = express.Router()

// Controller
const { getProductById, getProduct } = require('../controllers/product')

// Params
router.param('productId', getProductById)

// Routes
router.get('/product/:productId', getProduct)

module.exports = router