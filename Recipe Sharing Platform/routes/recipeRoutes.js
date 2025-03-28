const express = require("express");
const { getAllRecipes, addRecipe } = require("../controllers/recipeController");
const { verifyToken } = require("../middleware/authMiddleware");
const { body } = require("express-validator");
const rateLimit = require("express-rate-limit");

const router = express.Router();

// Rate Limiting: Max 5 recipes per hour (to prevent spam)
const recipeLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: "Too many recipes added! Please wait before adding another."
});

// Input Validation Middleware
const validateRecipe = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("ingredients").trim().notEmpty().withMessage("Ingredients are required"),
  body("instructions").trim().notEmpty().withMessage("Instructions are required"),
];

// Routes
router.get("/", getAllRecipes);
router.post("/add", verifyToken, recipeLimiter, validateRecipe, addRecipe);

module.exports = router;
