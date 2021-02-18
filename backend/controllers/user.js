const User = require('./../models/user')

exports.getUserById = (req, res, next, id) => {
    User.findById(id)
        .exec((err, user) => {
            if(err || !user) {
                return res.status(400)
                    .json({
                        error: "User not found"
                    })
            }
            req.profile = user
            next()
        })
}

exports.getUser = (req, res) => {
    return res.json({
        role: req.profile.role,
        purchases: req.profile.purchases,
        _id: req.profile._id,
        name: req.profile.name,
        lastname: req.profile.lastname,
        email: req.profile.email,
    })
}

exports.getAllUser = (req, res) => {
    User.find()
        .exec((err, users) => {
            if(err || !users) {
                return res.status(404)
                    .json({
                        error: "No User Found"
                    })
            }
            return res.json(users)
        })
}