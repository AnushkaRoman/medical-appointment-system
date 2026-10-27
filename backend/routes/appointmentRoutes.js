const express = require("express");
const Appointment = require("../models/Appointment");

const router = express.Router();

// =====================================================
// CREATE - Book a new appointment
// POST /api/appointments
// =====================================================
router.post("/", async (req, res) => {
    try {
        const appointment = await Appointment.create(req.body);

        res.status(201).json({
            success: true,
            message: "Appointment booked successfully",
            data: appointment
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to book appointment",
            error: error.message
        });
    }
});


// =====================================================
// READ - Get all appointments
// GET /api/appointments
// =====================================================
router.get("/", async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: appointments.length,
            data: appointments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch appointments",
            error: error.message
        });
    }
});


// =====================================================
// READ - Get one appointment by ID
// GET /api/appointments/:id
// =====================================================
router.get("/:id", async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            });
        }

        res.status(200).json({
            success: true,
            data: appointment
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid appointment ID",
            error: error.message
        });
    }
});


// =====================================================
// UPDATE - Update an appointment
// PUT /api/appointments/:id
// =====================================================
router.put("/:id", async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Appointment updated successfully",
            data: appointment
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to update appointment",
            error: error.message
        });
    }
});


// =====================================================
// DELETE - Delete an appointment
// DELETE /api/appointments/:id
// =====================================================
router.delete("/:id", async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(
            req.params.id
        );

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Appointment deleted successfully",
            data: appointment
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid appointment ID",
            error: error.message
        });
    }
});


// Export router
module.exports = router;
