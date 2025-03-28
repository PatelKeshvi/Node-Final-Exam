const Comment = require("../models/Comment");

exports.addComment = async (req, res) => {
  try {
    const { text, recipeId } = req.body;
    const comment = new Comment({ text, createdBy: req.user.id, recipe: recipeId });
    await comment.save();
    res.redirect(`/recipes/${recipeId}`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
