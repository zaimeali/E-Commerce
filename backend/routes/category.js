const express = require("express");
const router = express.Router();

// Controller
const {
  getCategoryById,
  createCategory,
  getCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

// Params
router.param("categoryId", getCategoryById);
router.param("userId", getUserById);

// Routes
router.post(
  "/category/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

router.get("/category/:categoryId", getCategory);

router.get("/categories", getAllCategories);

router.put(
  "/category/:userId/:categoryId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);

router.delete(
  "/category/:userId/:categoryId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteCategory
);

module.exports = router;
