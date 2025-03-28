const Recipe = require("../models/Recipe");

exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("createdBy", "username");
    if (!recipes || recipes.length === 0) {
      return res.status(404).json({ message: "No recipes found" });
    }
    res.render("recipeList", { recipes });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch recipes", details: err.message });
  }
};

exports.addRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;

    // Validate input
    if (!title || !ingredients || !instructions) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const recipe = new Recipe({
      title,
      ingredients,
      instructions,
      createdBy: req.user.id,
    });

    await recipe.save();

    res.status(201).json({ message: "Recipe added successfully", recipe });
  } catch (err) {
    res.status(500).json({ error: "Failed to add recipe", details: err.message });
  }
};
