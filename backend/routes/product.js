const express = require("express");
const router = express.Router();

// Controller
const {
  getProductById,
  getProduct,
  createProduct,
  photo,
} = require("../controllers/product");
const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
} = require("./../controllers/auth");
const { getUserById } = require("./../controllers/user");

// Params
router.param("productId", getProductById);
router.param("userId", getUserById);

// Routes
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

module.exports = router;
