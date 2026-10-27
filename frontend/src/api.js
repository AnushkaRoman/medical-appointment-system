const API_URL = "http://localhost:5000/api/appointments";

// =====================================================
// GET ALL APPOINTMENTS
// =====================================================

export async function getAppointments() {
    const response = await fetch(API_URL);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch appointments"
        );
    }

    return data;
}


// =====================================================
// CREATE APPOINTMENT
// =====================================================

export async function createAppointment(appointmentData) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error ||
            data.message ||
            "Failed to book appointment"
        );
    }

    return data;
}


// =====================================================
// GET APPOINTMENT BY ID
// =====================================================

export async function getAppointmentById(id) {
    const response = await fetch(`${API_URL}/${id}`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error ||
            data.message ||
            "Failed to fetch appointment"
        );
    }

    return data;
}


// =====================================================
// UPDATE APPOINTMENT
// =====================================================

export async function updateAppointment(id, appointmentData) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error ||
            data.message ||
            "Failed to update appointment"
        );
    }

    return data;
}


// =====================================================
// DELETE APPOINTMENT
// =====================================================

export async function deleteAppointment(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error ||
            data.message ||
            "Failed to delete appointment"
        );
    }

    return data;
}