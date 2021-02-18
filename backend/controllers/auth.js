const User = require("../models/user")

// Express-Validation
const { validationResult } = require('express-validator')

// JWT
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')


exports.signin = (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(422)
            .json(errors)
    }

    const { email, password } = req.body

    User.findOne({ email }, (err, user) => {
        if(err || !user) {
            return res.status(400)
                    .json({
                        error: "User email does not exists"
                    })
        }
        
        if(!user.authenticate(password)) {
            return res.status(401)
                    .json({
                        error: "Password does not match"
                    })
        }

        // create token
        const token = jwt.sign({
            _id: user._id
        }, process.env.SECRET_KEY)

        // put token in cookie
        res.cookie("token", token, {
            expire: new Date() + 9999
        })

        // send response to front end
        const { _id, name, email, role } = user
        return res.json({
            token,
            user: {
                _id,
                name, 
                email,
                role
            }
        })
    })
}

exports.signup = (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(422)
            .json(errors)
    }

    const user = new User(req.body)
    user.save((err, user) => {
        if(err) {
            return res.status(400).json({
                err: "Not able to save user in DB",
                status_code: 400,
                status_message: "Bad Request"
            })
        }
        // res.json({
        //     message: "User save successfully",
        //     body: user
        // })
        res.json({
            message: "User Created Successfully",
            email: user.email,
            name: user.name,
            lastname: user.lastname,
            id: user._id,
        })
    })
    // res.json({
    //     message: "User Signup Successfully",
    //     body: req.body // middleware bodyparser define in app.js
    // })
}

exports.signout = (req, res) => {
    // clear cookie
    res.clearCookie("token")

    // res.send("User Signout")
    res.json({
        message: "User Signout Successfully"
    })
}


// protected Routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET_KEY,
    algorithms: ['HS256']
})

// custom middlewares
exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.user && req.profile._id == req.user._id
    // console.log(req.profile._id)
    // console.log(req)
    if(!checker) {
        return res.status(403)
            .json({
                error: "ACCESS DENIED"
            })
    }
    next()
}

exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0) {
        return res.status(403)
            .json({
                error: "You are not admin"
            })
    }
    next()
}