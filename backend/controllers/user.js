const User = require('./../models/user')
const Order = require('./../models/order')

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

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.profile._id },
        {
            $set: req.body
        },
        { 
            new: true, 
            useFindAndModify: false
        },
        (err, user) => {
            if(err || !user) {
                return res.status(400)
                    .json({
                        error: "User not found"
                    })
            }
            return res.json({
                status: "Update Successfully",
                user: {
                    role: user.role,
                    purchases: user.purchases,
                    _id: user._id,
                    name: user.name,
                    lastname: user.lastname,
                    email: user.email,
                }
            })
        }
    )
}

exports.userPurchaseList = (req, res) => {
    Order.find({ user: req.profile._id })
        .populate("user", "_id name")
        .exec((err, order) => {
            if(err) {
                return res.status(400)
                    .json({
                        error: "No order in this account"
                    })
            }
            return res.json(order)
        })
}

exports.pushOrderInPurchaseList = (req, res, next) => {
    let purchases = []
    req.body.order.products.forEach(product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        })
    })

    // Store in dB
    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $push: { purchases: purchases } },
        { new: true },  // it will send the updated one
        (err, purchases) => {
            if(err) {
                return res.status(400)
                    .json({
                        error: "Unable to save purchase list"
                    })
            }
            next()
        }
    )
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