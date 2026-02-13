


const express = require("express");
const cors = require("cors");
require("dotenv").config();

const aiRoutes = require("./routes/aiRoutes");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// DB with error handling
connectDB().catch(err => {
  console.error("❌ MongoDB connection failed:", err.message);
  // Continue running even if DB fails (if you don't need it)
});

// Middlewares
app.use(cors({
  origin: [
    "https://ai-spell-checker-three.vercel.app",
    "http://localhost:3000",
    "http://localhost:5173"
  ]
}));

app.use(express.json({ limit: "10mb" }));

// Log all requests
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.path}`);
  next();
});

// Routes
app.use("/api/v1/spell", aiRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "Server running",
    env: {
      hasGeminiKey: !!process.env.GEMINI_API_KEY,
      hasMongoUri: !!process.env.MONGODB_URI
    }
  });
});

// 404
app.use((req, res) => {
  console.log(`❌ 404: ${req.method} ${req.path}`);
  res.status(404).json({ 
    message: "Route not found",
    path: req.path 
  });
});

// Error handler - IMPORTANT: has 4 parameters
app.use((err, req, res, next) => {
  console.error("💥 Server Error:", err.message);
  console.error(err.stack);
  res.status(500).json({ 
    message: "Internal Server Error",
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🔑 Gemini API Key: ${process.env.GEMINI_API_KEY ? 'Present' : 'MISSING'}`);
  console.log(`🗄️  MongoDB URI: ${process.env.MONGODB_URI ? 'Present' : 'MISSING'}`);
});
