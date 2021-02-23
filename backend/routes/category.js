const express = require('express')
const router = express.Router()

// Controller
const { getCategoryById } = require('../controllers/category')
const { isAdmin, isAuthenticated, isSignedIn } = require('../controllers/auth')
const { getUserById } = require('../controllers/user')

router.param("categoryId", getCategoryById)
router.param("userId", getUserById)

module.exports = router