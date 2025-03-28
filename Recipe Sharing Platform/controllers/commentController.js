const Comment = require("../models/Comment");

exports.addComment = async (req, res) => {
  try {
    const { text, recipeId } = req.body;

    // Validate input
    if (!text || !recipeId) {
      return res.status(400).json({ message: "Text and recipeId are required" });
    }

    const comment = new Comment({
      text,
      createdBy: req.user.id,
      recipe: recipeId,
    });

    await comment.save();

    res.status(201).json({ message: "Comment added successfully", comment });
  } catch (err) {
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
};
