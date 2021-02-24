const Product = require('./../models/product')

exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
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