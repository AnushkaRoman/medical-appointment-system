const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
    {
        patientName: {
            type: String,
            required: [true, "Patient name is required"],
            trim: true,
            minlength: [2, "Patient name must be at least 2 characters"]
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please enter a valid email address"
            ]
        },

        phone: {
            type: String,
            required: [true, "Phone number is required"],
            trim: true,
            match: [
                /^[0-9]{10}$/,
                "Phone number must contain exactly 10 digits"
            ]
        },

        doctor: {
            type: String,
            required: [true, "Doctor is required"],
            trim: true
        },

        department: {
            type: String,
            required: [true, "Department is required"],
            trim: true
        },

        appointmentDate: {
            type: Date,
            required: [true, "Appointment date is required"]
        },

        appointmentTime: {
            type: String,
            required: [true, "Appointment time is required"]
        },

        reason: {
            type: String,
            required: [true, "Reason for appointment is required"],
            trim: true,
            minlength: [3, "Reason must be at least 3 characters"]
        },

        status: {
            type: String,
            enum: ["Scheduled", "Completed", "Cancelled"],
            default: "Scheduled"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Appointment", appointmentSchema);