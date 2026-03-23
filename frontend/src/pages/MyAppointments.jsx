import React, { useState, useEffect } from "react";
import { getUserAppointments } from "../services/api";

const MyAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const userStr = localStorage.getItem("user");
                if (!userStr) {
                    setError("Please login to view appointments.");
                    setLoading(false);
                    return;
                }
                const user = JSON.parse(userStr);
                const response = await getUserAppointments(user.id);
                setAppointments(response.data);
            } catch (err) {
                console.error("Failed to fetch appointments:", err);
                setError("Failed to load your appointments.");
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    if (loading) return <div className="page-container"><h2>Loading your appointments...</h2></div>;

    return (
        <div className="page-container">
            <h2>My Appointments</h2>
            {error && <p className="error">{error}</p>}
            
            {!error && appointments.length === 0 && (
                <p>You have no booked appointments yet.</p>
            )}

            <div className="appointments-grid" style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                {appointments.map((appt) => (
                    <div key={appt.id} className="doctor-card" style={{ padding: '20px', textAlign: 'left' }}>
                        <h3>Dr. {appt.doctorName}</h3>
                        <p><strong>Specialty:</strong> {appt.specialtyName}</p>
                        <p><strong>Appointment Date:</strong> {new Date(appt.appointmentDate).toLocaleDateString()}</p>
                        <p><strong>Status:</strong> <span style={{ fontWeight: 'bold', color: appt.status === 'CONFIRMED' ? 'green' : 'orange' }}>{appt.status}</span></p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyAppointments;
