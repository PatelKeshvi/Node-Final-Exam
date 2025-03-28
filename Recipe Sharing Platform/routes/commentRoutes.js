const express = require("express");
const { addComment } = require("../controllers/commentController");
const { verifyToken } = require("../middleware/authMiddleware");
const { body } = require("express-validator");
const rateLimit = require("express-rate-limit");

const router = express.Router();

// Rate Limiting: Max 5 comments per minute (to prevent spam)
const commentLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, 
  message: "Too many comments! Please wait a minute before commenting again.",
});

// Input Validation Middleware
const validateComment = [
  body("text").trim().notEmpty().withMessage("Comment text is required"),
  body("recipeId").isMongoId().withMessage("Valid recipe ID is required"),
];

// Routes
router.post("/add", verifyToken, commentLimiter, validateComment, addComment);

module.exports = router;
