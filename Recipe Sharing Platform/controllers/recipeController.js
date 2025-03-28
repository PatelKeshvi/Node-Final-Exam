const Recipe = require("../models/Recipe");

exports.getAllRecipes = async (req, res) => {
  const recipes = await Recipe.find().populate("createdBy", "username");
  res.render("recipeList", { recipes });
};

exports.addRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;
    const recipe = new Recipe({ title, ingredients, instructions, createdBy: req.user.id });
    await recipe.save();
    res.redirect("/recipes");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
