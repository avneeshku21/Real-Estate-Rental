import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Import route files
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.route.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ MongoDB Connection Function
const connectDB = async () => {
  if (!process.env.MONGO) {
    console.error("❌ MONGO connection string is missing in .env file!");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

// ✅ Middleware
app.use(cors({ origin: "http://localhost:5173" })); // Allow frontend requests
app.use(express.json()); // Parse JSON request bodies

// ✅ API Routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("Hello Namastey! 🚀");
});

// ✅ Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Error Middleware:", err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }), // Show stack trace in development mode
  });
});

// ✅ Start Server **after connecting to DB**
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
