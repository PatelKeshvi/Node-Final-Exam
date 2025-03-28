const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    username: { 
      type: String, 
      required: [true, "Username is required"], 
      unique: true, 
      trim: true 
    },
    email: { 
      type: String, 
      required: [true, "Email is required"], 
      unique: true, 
      trim: true, 
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"] 
    },
    password: { 
      type: String, 
      required: [true, "Password is required"], 
      minlength: [8, "Password must be at least 8 characters long"]
    },
    role: { 
      type: String, 
      enum: ["admin", "user"], 
      default: "user" 
    }
  },
  { 
    timestamps: true // Automatically adds `createdAt` & `updatedAt`
  }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare Password Method
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
