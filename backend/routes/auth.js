const express = require('express')
const router = express.Router()

// Express-Validation
const { check } = require('express-validator')

// Controller
const { signin, signout, signup } = require('../controllers/auth')


const loginRules = [
    check("email", "email is required")
        .isEmail(),
    check("password", "password should be atleast 8 character")
        .isLength({
            min: 8,
        })
]

const registerRules = [
    check("name", "length of the name should be atleast 3")
        .isLength({
            min: 3,
        }),
    check("email", "email is required")
        .isEmail(),
    check("password", "password should be atleast 8 character")
        .isLength({
            min: 8,
        })
]

router.post('/signin', loginRules, signin)
router.post("/signup", registerRules, signup)
router.get("/signout", signout)

module.exports = router