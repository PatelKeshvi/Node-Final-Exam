const express = require("express");
const { getAllRecipes, addRecipe } = require("../controllers/recipeController");
const router = express.Router();

router.get("/", getAllRecipes);
router.post("/add", addRecipe);

module.exports = router;
