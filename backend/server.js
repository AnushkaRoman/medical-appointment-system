require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();

// =====================================================
// MIDDLEWARE
// =====================================================

// Allow requests from the React/Vite frontend
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"],
    })
);

// Read JSON data sent by the frontend
app.use(express.json());


// =====================================================
// HEALTH CHECK
// GET /api/health
// =====================================================

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Medical Appointment API is running",
        database: mongoose.connection.readyState === 1
            ? "Connected"
            : "Disconnected",
    });
});


// =====================================================
// APPOINTMENT ROUTES
// =====================================================

app.use("/api/appointments", appointmentRoutes);


// =====================================================
// ROOT ROUTE
// GET /
// =====================================================

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the Medical Appointment Management System API",
        version: "1.0.0",
        endpoints: {
            health: "/api/health",
            appointments: "/api/appointments",
        },
    });
});


// =====================================================
// 404 HANDLER
// =====================================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});


// =====================================================
// GLOBAL ERROR HANDLER
// =====================================================

app.use((error, req, res, next) => {
    console.error("Server error:", error);

    res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
    });
});


// =====================================================
// MONGODB CONNECTION + SERVER START
// =====================================================

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on http://localhost:${PORT}`);
            console.log("Medical Appointment API is ready");
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:");
        console.error(error.message);
        process.exit(1);
    });