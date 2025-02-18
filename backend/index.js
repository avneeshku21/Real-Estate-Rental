import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // Allow configurable port

// MongoDB Connection
if (!process.env.MONGO) {
  console.error("❌ MONGO connection string is missing in .env file!");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello Namastey!");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Error Middleware:", err); // Logs error to console

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }), // Show stack trace in dev mode
  });
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
