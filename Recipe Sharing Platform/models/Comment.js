const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    text: { 
      type: String, 
      required: [true, "Comment text is required"], 
      trim: true 
    },
    createdBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true, 
      index: true 
    },
    recipe: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Recipe", 
      required: true, 
      index: true 
    },
  },
  { 
    timestamps: true // Automatically adds `createdAt` & `updatedAt`
  }
);

// Auto-delete comments when related user/recipe is deleted
CommentSchema.pre("remove", async function (next) {
  await mongoose.model("Recipe").updateMany(
    { _id: this.recipe }, 
    { $pull: { comments: this._id } }
  );
  next();
});

module.exports = mongoose.model("Comment", CommentSchema);
