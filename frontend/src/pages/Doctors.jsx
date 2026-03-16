import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDoctors } from "../services/api";

const Doctors = () => {

    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {

        const fetchDoctors = async () => {

            try {

                const response = await getDoctors();

                if (response.data && response.data.length > 0) {
                    setDoctors(response.data);
                } else {
                    loadSampleDoctors();
                }

            } catch (error) {

                console.log("API failed, loading sample doctors");
                loadSampleDoctors();

            }

        };

        fetchDoctors();

    }, []);


    const loadSampleDoctors = () => {

        const sampleDoctors = [

            {
                id: 1,
                name: "John Smith",
                specialtyName: "Cardiology",
                available: true
            },

            {
                id: 2,
                name: "Emily Johnson",
                specialtyName: "Neurology",
                available: true
            },

            {
                id: 3,
                name: "Michael Brown",
                specialtyName: "Orthopedics",
                available: false
            },

            {
                id: 4,
                name: "Sarah Davis",
                specialtyName: "Dermatology",
                available: true
            },

            {
                id: 5,
                name: "David Wilson",
                specialtyName: "Pediatrics",
                available: true
            }

        ];

        setDoctors(sampleDoctors);

    };


    const handleBookAppointment = (doctorId) => {

        const userStr = localStorage.getItem("user");

        if (!userStr) {

            alert("Please login first");
            navigate("/login");
            return;

        }

        navigate("/book-appointment", { state: { doctorId } });

    };


    return (

        <div className="page-container">

            <h2>Our Doctors</h2>

            <div className="doctors-grid">

                {doctors.map((doc) => (

                    <div key={doc.id} className="doctor-card">

                        <h3>Dr. {doc.name}</h3>

                        <p>Specialty: {doc.specialtyName}</p>

                        <p className={doc.available ? "available" : "unavailable"}>
                            {doc.available ? "Available" : "Unavailable"}
                        </p>

                        {doc.available && (

                            <button
                                className="btn btn-primary"
                                onClick={() => handleBookAppointment(doc.id)}
                            >
                                Book Appointment
                            </button>

                        )}

                    </div>

                ))}

            </div>

        </div>

    );

};

export default Doctors;