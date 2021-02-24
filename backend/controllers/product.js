const Product = require('./../models/product')

// formidable
const formidabale = require('formidable')

// lodash
const _ = require('lodash')


exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
        .populate("category")
        .exec((err, product) => {
            if(err) {
                return res.status(400)
                    .json({
                        error: "No Product Found"
                    })
            }
            req.product = product
            next()
        })
}

exports.getProduct = (req, res) => {
    return res.json(req.product)
}

exports.createProduct = (req, res) => {

}