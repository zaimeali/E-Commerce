const Product = require("./../models/product");

// formidable
const formidabale = require("formidable");

// lodash
const _ = require("lodash");

// FileSystem
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "No Product Found",
        });
      }
      req.product = product;
      next();
    });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

// Middleware to send photo when call get product request
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    res.send(req.product.photo.data);
  }
  next();
};

exports.createProduct = (req, res) => {
  let form = new formidabale.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem with Image",
        message: err,
      });
    }

    //   Destructure Fields
    const { name, description, price, category, stock } = fields;

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "Please include all fields",
      });
    }

    let product = new Product(fields);

    // handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size is too big!",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // Save to the dB
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Something got wrong in saving product",
          message: err,
        });
      }
      res.json({
        product,
      });
    });
  });
};
