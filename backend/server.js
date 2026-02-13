const express = require("express");
const cors = require("cors");
require("dotenv").config();

const aiRoutes = require("./router/aiRoutes");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// DB
connectDB();

// Middlewares
app.use(cors({
  origin: [
    "https://ai-spell-checker-three.vercel.app",
    "http://localhost:3000",
    "http://localhost:5173"
  ]
}));

app.use(express.json({ limit: "10mb" }));

// Routes
app.use("/api/v1/spell", aiRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server running" });
});

// 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});