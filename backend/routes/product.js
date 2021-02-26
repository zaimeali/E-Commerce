const express = require("express");
const router = express.Router();

// Controller
const {
  getProductById,
  getProduct,
  createProduct,
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

router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

module.exports = router;
