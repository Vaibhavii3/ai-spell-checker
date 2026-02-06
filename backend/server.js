const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config(); 

const authRoutes = require("./router/auth.js")
const aiRoutes = require("./router/aiRoutes");
const connectDB = require("./config/db.js");

const app = express();

const PORT = process.env.PORT || 5000;

connectDB();

// Middleware
app.use(cors({
    origin: 'https://ai-spell-checker-three.vercel.app',
    credentials: true
}));
app.use(bodyParser.json());


// Routes    
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/spell", aiRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});  

//start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});




