import { useEffect, useState } from "react";
import {
    createAppointment,
    deleteAppointment,
    getAppointments,
    updateAppointment,
} from "./api";
import "./App.css";

function App() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        patientName: "",
        email: "",
        phone: "",
        doctor: "",
        department: "",
        appointmentDate: "",
        appointmentTime: "",
        reason: "",
    });

    // =====================================================
    // LOAD APPOINTMENTS
    // =====================================================

    const loadAppointments = async () => {
        try {
            setLoading(true);
            setError("");

            const result = await getAppointments();

            setAppointments(result.data || []);
        } catch (err) {
            console.error("Error loading appointments:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    // Load appointments when page opens
    useEffect(() => {
        loadAppointments();
    }, []);


    // =====================================================
    // HANDLE FORM INPUT
    // =====================================================

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));
    };


    // =====================================================
    // CREATE APPOINTMENT
    // =====================================================

    const handleSubmit = async (event) => {
        event.preventDefault();

        setMessage("");
        setError("");

        try {
            await createAppointment(formData);

            setMessage("Appointment booked successfully!");

            setFormData({
                patientName: "",
                email: "",
                phone: "",
                doctor: "",
                department: "",
                appointmentDate: "",
                appointmentTime: "",
                reason: "",
            });

            await loadAppointments();

            // Scroll to appointments
            document
                .getElementById("appointments")
                ?.scrollIntoView({
                    behavior: "smooth",
                });

        } catch (err) {
            console.error("Error creating appointment:", err);
            setError(err.message);
        }
    };


    // =====================================================
    // UPDATE APPOINTMENT STATUS
    // =====================================================

    const handleStatusUpdate = async (appointment) => {
        setMessage("");
        setError("");

        try {
            const newStatus =
                appointment.status === "Scheduled"
                    ? "Completed"
                    : "Scheduled";

            await updateAppointment(
                appointment._id,
                {
                    status: newStatus,
                }
            );

            setMessage(
                "Appointment status updated successfully."
            );

            await loadAppointments();

        } catch (err) {
            console.error("Error updating appointment:", err);
            setError(err.message);
        }
    };


    // =====================================================
    // DELETE APPOINTMENT
    // =====================================================

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this appointment?"
        );

        if (!confirmed) {
            return;
        }

        setMessage("");
        setError("");

        try {
            await deleteAppointment(id);

            setMessage(
                "Appointment deleted successfully."
            );

            await loadAppointments();

        } catch (err) {
            console.error("Error deleting appointment:", err);
            setError(err.message);
        }
    };


    // =====================================================
    // FORMAT DATE
    // =====================================================

    const formatDate = (date) => {
        if (!date) {
            return "";
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };


    return (
        <div className="app">

            {/* =================================================
                NAVBAR
            ================================================= */}

            <header className="navbar">

                <div className="logo">
                    <span className="logo-icon">
                        ✚
                    </span>

                    MediCare
                </div>

                <nav>
                    <a href="#home">
                        Home
                    </a>

                    <a href="#book">
                        Book Appointment
                    </a>

                    <a href="#appointments">
                        Appointments
                    </a>
                </nav>

            </header>


            {/* =================================================
                HERO SECTION
            ================================================= */}

            <section
                id="home"
                className="hero-section"
            >

                <div className="hero-content">

                    <p className="eyebrow">
                        MEDICAL APPOINTMENT MANAGEMENT SYSTEM
                    </p>

                    <h1>
                        Your Health,
                        <br />
                        <span>
                            Our Priority.
                        </span>
                    </h1>

                    <p className="hero-text">
                        Book and manage your medical
                        appointments easily through our
                        secure appointment management system.
                    </p>

                    <a
                        href="#book"
                        className="primary-button"
                    >
                        Book an Appointment
                    </a>

                </div>


                <div className="hero-card">

                    <div className="doctor-icon">
                        ⚕
                    </div>

                    <h3>
                        Quality Healthcare
                    </h3>

                    <p>
                        Connect with doctors and manage
                        your appointments from one
                        convenient platform.
                    </p>

                </div>

            </section>


            {/* =================================================
                FEATURES
            ================================================= */}

            <section className="features">

                <div className="feature-card">

                    <span>
                        🩺
                    </span>

                    <h3>
                        Expert Doctors
                    </h3>

                    <p>
                        Choose from available medical
                        specialists.
                    </p>

                </div>


                <div className="feature-card">

                    <span>
                        📅
                    </span>

                    <h3>
                        Easy Booking
                    </h3>

                    <p>
                        Schedule your appointment in
                        just a few steps.
                    </p>

                </div>


                <div className="feature-card">

                    <span>
                        🔒
                    </span>

                    <h3>
                        Secure Records
                    </h3>

                    <p>
                        Your appointment information
                        is securely managed.
                    </p>

                </div>

            </section>


            {/* =================================================
                BOOK APPOINTMENT
            ================================================= */}

            <section
                id="book"
                className="section"
            >

                <div className="section-heading">

                    <p className="eyebrow">
                        BOOK YOUR VISIT
                    </p>

                    <h2>
                        Schedule an Appointment
                    </h2>

                    <p>
                        Fill in your details below to
                        schedule your medical appointment.
                    </p>

                </div>


                {message && (
                    <div className="success-message">
                        {message}
                    </div>
                )}


                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}


                <form
                    className="appointment-form"
                    onSubmit={handleSubmit}
                >

                    {/* PATIENT NAME */}

                    <div className="form-group">

                        <label>
                            Patient Name
                        </label>

                        <input
                            type="text"
                            name="patientName"
                            value={formData.patientName}
                            onChange={handleChange}
                            placeholder="Enter patient name"
                            minLength="2"
                            required
                        />

                    </div>


                    {/* EMAIL */}

                    <div className="form-group">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email address"
                            required
                        />

                    </div>


                    {/* PHONE */}

                    <div className="form-group">

                        <label>
                            Phone Number
                        </label>

                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="10-digit phone number"
                            pattern="[0-9]{10}"
                            maxLength="10"
                            required
                        />

                    </div>


                    {/* DOCTOR */}

                    <div className="form-group">

                        <label>
                            Doctor
                        </label>

                        <select
                            name="doctor"
                            value={formData.doctor}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Select Doctor
                            </option>

                            <option value="Dr. Priya Sharma">
                                Dr. Priya Sharma
                            </option>

                            <option value="Dr. Rahul Mehta">
                                Dr. Rahul Mehta
                            </option>

                            <option value="Dr. Anjali Patil">
                                Dr. Anjali Patil
                            </option>

                            <option value="Dr. Arjun Deshmukh">
                                Dr. Arjun Deshmukh
                            </option>

                        </select>

                    </div>


                    {/* DEPARTMENT */}

                    <div className="form-group">

                        <label>
                            Department
                        </label>

                        <select
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Select Department
                            </option>

                            <option value="Cardiology">
                                Cardiology
                            </option>

                            <option value="Dermatology">
                                Dermatology
                            </option>

                            <option value="General Medicine">
                                General Medicine
                            </option>

                            <option value="Orthopedics">
                                Orthopedics
                            </option>

                            <option value="Pediatrics">
                                Pediatrics
                            </option>

                        </select>

                    </div>


                    {/* DATE */}

                    <div className="form-group">

                        <label>
                            Appointment Date
                        </label>

                        <input
                            type="date"
                            name="appointmentDate"
                            value={formData.appointmentDate}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* TIME */}

                    <div className="form-group">

                        <label>
                            Appointment Time
                        </label>

                        <input
                            type="time"
                            name="appointmentTime"
                            value={formData.appointmentTime}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* REASON */}

                    <div className="form-group full-width">

                        <label>
                            Reason for Appointment
                        </label>

                        <textarea
                            name="reason"
                            value={formData.reason}
                            onChange={handleChange}
                            placeholder="Describe the reason for your visit"
                            rows="4"
                            minLength="3"
                            required
                        />

                    </div>


                    {/* SUBMIT */}

                    <button
                        type="submit"
                        className="submit-button"
                    >
                        Book Appointment
                    </button>

                </form>

            </section>


            {/* =================================================
                APPOINTMENTS
            ================================================= */}

            <section
                id="appointments"
                className="section appointments-section"
            >

                <div className="section-heading">

                    <p className="eyebrow">
                        APPOINTMENT MANAGEMENT
                    </p>

                    <h2>
                        Appointments
                    </h2>

                    <p>
                        View and manage appointments
                        stored in MongoDB.
                    </p>

                </div>


                {loading ? (

                    <p className="loading">
                        Loading appointments...
                    </p>

                ) : appointments.length === 0 ? (

                    <div className="empty-state">

                        <span>
                            📋
                        </span>

                        <h3>
                            No appointments yet
                        </h3>

                        <p>
                            Book your first appointment above.
                        </p>

                    </div>

                ) : (

                    <div className="appointment-grid">

                        {appointments.map(
                            (appointment) => (

                                <div
                                    className="appointment-card"
                                    key={appointment._id}
                                >

                                    <div className="appointment-top">

                                        <div>

                                            <h3>
                                                {
                                                    appointment.patientName
                                                }
                                            </h3>

                                            <p>
                                                {
                                                    appointment.department
                                                }
                                            </p>

                                        </div>


                                        <span
                                            className={`status ${(
                                                appointment.status ||
                                                "Scheduled"
                                            ).toLowerCase()}`}
                                        >
                                            {
                                                appointment.status
                                            }
                                        </span>

                                    </div>


                                    <div className="appointment-details">

                                        <p>
                                            <strong>
                                                Doctor:
                                            </strong>{" "}
                                            {
                                                appointment.doctor
                                            }
                                        </p>


                                        <p>
                                            <strong>
                                                Date:
                                            </strong>{" "}
                                            {
                                                formatDate(
                                                    appointment.appointmentDate
                                                )
                                            }
                                        </p>


                                        <p>
                                            <strong>
                                                Time:
                                            </strong>{" "}
                                            {
                                                appointment.appointmentTime
                                            }
                                        </p>


                                        <p>
                                            <strong>
                                                Email:
                                            </strong>{" "}
                                            {
                                                appointment.email
                                            }
                                        </p>


                                        <p>
                                            <strong>
                                                Phone:
                                            </strong>{" "}
                                            {
                                                appointment.phone
                                            }
                                        </p>


                                        <p>
                                            <strong>
                                                Reason:
                                            </strong>{" "}
                                            {
                                                appointment.reason
                                            }
                                        </p>

                                    </div>


                                    <div className="card-actions">

                                        <button
                                            className="secondary-button"
                                            onClick={() =>
                                                handleStatusUpdate(
                                                    appointment
                                                )
                                            }
                                        >
                                            {
                                                appointment.status ===
                                                "Scheduled"
                                                    ? "Mark Completed"
                                                    : "Mark Scheduled"
                                            }
                                        </button>


                                        <button
                                            className="delete-button"
                                            onClick={() =>
                                                handleDelete(
                                                    appointment._id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                )}

            </section>


            {/* =================================================
                FOOTER
            ================================================= */}

            <footer>

                <div className="footer-logo">
                    ✚ MediCare
                </div>

                <p>
                    Medical Appointment Management System
                </p>

                <p className="footer-small">
                    React • Node.js • Express • MongoDB
                </p>

            </footer>

        </div>
    );
}

export default App;