const mongoose = require('mongoose')
const Schema = mongoose.Schema

const { ObjectId } = mongoose.Schema

const productCartSchema = new Schema({
    product: {
        type: ObjectId,
        ref: "Product"
    },
    name: String,
    count: Number,
    price: Number
})

const orderSchema = new Schema({
    products: [
        productCartSchema
    ],
    transaction_id: {

    },
    amount: {
        type: Number
    },
    address: String,
    updated: Date,
    user: {
        type: ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})

const Order = mongoose.model("Order", orderSchema)
const ProductCart = mongoose.model("ProductCart", productCartSchema)

module.exports = { Order, ProductCart }