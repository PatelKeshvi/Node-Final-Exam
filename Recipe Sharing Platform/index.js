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

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.set("view engine", "ejs");
app.use(express.static("public"));



// Routes
app.use("/auth", authRoutes);
app.use("/recipes", verifyToken, recipeRoutes);
app.use("/comments", verifyToken, commentRoutes);

app.get("/", (req, res) => res.render("index"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
