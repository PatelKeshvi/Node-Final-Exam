const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: [true, "Recipe title is required"], 
      trim: true 
    },
    ingredients: { 
      type: [String], // Array of ingredients
      required: [true, "Ingredients are required"], 
      validate: [(val) => val.length > 0, "At least one ingredient is required"]
    },
    instructions: { 
      type: String, 
      required: [true, "Instructions are required"], 
      trim: true 
    },
    createdBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true, 
      index: true 
    }
  },
  { 
    timestamps: true // Automatically adds `createdAt` & `updatedAt`
  }
);

// Auto-delete related comments when a recipe is deleted
RecipeSchema.pre("remove", async function (next) {
  await mongoose.model("Comment").deleteMany({ recipe: this._id });
  next();
});

module.exports = mongoose.model("Recipe", RecipeSchema);
