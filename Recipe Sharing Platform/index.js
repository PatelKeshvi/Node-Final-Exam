require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const commentRoutes = require("./routes/commentRoutes");

const { verifyToken } = require("./middleware/authMiddleware");

const app = express();

// Database Connection
connectDB()
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

// Middleware
app.use(express.json()); // Body parsing for JSON data
app.use(express.urlencoded({ extended: true })); // Form data parsing
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true })); // CORS configuration
app.set("view engine", "ejs");
app.use(express.static("public"));

// Routes
app.use("/auth", authRoutes);
app.use("/recipes", verifyToken, recipeRoutes);
app.use("/comments", verifyToken, commentRoutes);

app.get("/", (req, res) => res.render("index"));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
