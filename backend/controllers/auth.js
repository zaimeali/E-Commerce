const User = require("../models/user")

exports.signup = (req, res) => {
    const user = new User(req.body)
    user.save((err, user) => {
        if(err) {
            return res.status(400).json({
                err: "Not able to save user in DB"
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
    // res.send("User Signout")
    res.json({
        message: "User Signout Successfully"
    })
}