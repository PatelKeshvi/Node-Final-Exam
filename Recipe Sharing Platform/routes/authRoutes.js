const express = require("express");
const { registerUser, loginUser, logoutUser } = require("../controllers/authController");
const { body } = require("express-validator");
const rateLimit = require("express-rate-limit");

const router = express.Router();

// Rate Limiting: Max 5 requests per 15 minutes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, 
  message: "Too many attempts. Please try again later."
});

// Input Validation Middleware
const validateAuth = [
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
];

// Routes
router.post("/register", authLimiter, validateAuth, registerUser);
router.post("/login", authLimiter, loginUser);
router.get("/logout", logoutUser); // Changed to GET for better security

module.exports = router;
