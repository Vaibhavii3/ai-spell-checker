const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config(); 

const authRoutes = require("./router/auth.js");
const aiRoutes = require("./router/aiRoutes");
const connectDB = require("./config/db.js");

const app = express();

const PORT = process.env.PORT || 5000;

connectDB();

// ✅ CORS Configuration - Allow multiple origins
const allowedOrigins = [
    'https://ai-spell-checker-three.vercel.app',
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://127.0.0.1:3000'
];

app.use(cors({
    origin: function (origin, callback) {
        // ✅ Allow requests with no origin (like mobile apps, Postman, curl)
        if (!origin) return callback(null, true);
        
        // ✅ Check if origin is in allowed list
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log('❌ Blocked by CORS:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: 86400 // 24 hours
}));

// ✅ Body parser middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// ✅ Request logging (helpful for debugging)
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path} from ${req.get('origin') || 'unknown origin'}`);
    next();
});

// ✅ Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

app.get('/', (req, res) => {
    res.status(200).json({ 
        message: 'AI Spell Checker API',
        version: '1.0.0',
        endpoints: {
            health: '/health',
            auth: '/api/v1/auth',
            spell: '/api/v1/spell'
        }
    });
});

// Routes    
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/spell", aiRoutes);

// 404 handler
app.use((req, res) => {
    console.log('❌ 404 - Route not found:', req.path);
    res.status(404).json({ 
        success: false,
        message: "Route not found",
        path: req.path 
    });
});  

// ✅ Global error handler
app.use((err, req, res, next) => {
    console.error('❌ Global error:', err.message);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📅 Started at: ${new Date().toISOString()}`);
    console.log(`🔗 Allowed origins:`, allowedOrigins.join(', '));
});

// ✅ Graceful shutdown
process.on('SIGTERM', () => {
    console.log('⚠️  SIGTERM received, shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('⚠️  SIGINT received, shutting down gracefully...');
    process.exit(0);
});

module.exports = app;

