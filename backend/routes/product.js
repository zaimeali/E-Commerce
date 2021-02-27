const express = require("express");
const router = express.Router();

// Controller
const {
  getProductById,
  getProduct,
  createProduct,
  photo,
  deleteProduct,
  updateProduct,
  getAllProducts,
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
// Read
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

// Create
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

// delete
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

// update
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

// listing
router.get("/products", getAllProducts);

module.exports = router;
