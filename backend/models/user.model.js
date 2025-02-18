import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true, // Removes extra spaces
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true, // Ensures case-insensitive emails
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"], // Email validation
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Minimum password length for security
    },
  },
  { timestamps: true }
);

// Middleware: Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Avoid rehashing if unchanged

  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords during login
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcryptjs.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;