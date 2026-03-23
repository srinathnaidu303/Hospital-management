import React, { useEffect, useState } from 'react';
import { getSpecialties } from '../services/api';

const Home = () => {
    const [specialties, setSpecialties] = useState([]);

    useEffect(() => {
        const fetchSpecialties = async () => {
            try {
                const response = await getSpecialties();
                if (response.data && response.data.length > 0) {
                    setSpecialties(response.data);
                } else {
                    loadSampleSpecialties();
                }
            } catch (err) {
                console.error("Error fetching specialties:", err);
                loadSampleSpecialties();
            }
        };

        const loadSampleSpecialties = () => {
            setSpecialties([
                { id: 1, name: "Cardiology", description: "Expert heart care and comprehensive cardiovascular treatments." },
                { id: 2, name: "Neurology", description: "Advanced treatments for brain, spine, and nervous system disorders." },
                { id: 3, name: "Orthopedics", description: "Specialized care for bones, joints, ligaments, and muscle injuries." },
                { id: 4, name: "Dermatology", description: "Medical and cosmetic treatments for skin, hair, and nails." },
                { id: 5, name: "Pediatrics", description: "Compassionate and dedicated healthcare for children of all ages." }
            ]);
        };

        fetchSpecialties();
    }, []);

    const getSpecialtyDescription = (name) => {
        const descriptions = {
            "Cardiology": "Expert heart care and comprehensive cardiovascular treatments.",
            "Neurology": "Advanced treatments for brain, spine, and nervous system disorders.",
            "Orthopedics": "Specialized care for bones, joints, ligaments, and muscle injuries.",
            "Dermatology": "Medical and cosmetic treatments for skin, hair, and nails.",
            "Pediatrics": "Compassionate and dedicated healthcare for children of all ages."
        };
        return descriptions[name] || "Expert medical care and specialized treatment.";
    };

    const getSpecialtyStyle = (name) => {
        const styles = {
            "Cardiology": { background: "linear-gradient(135deg, #ff7e5f, #feb47b)", color: "white" },
            "Neurology": { background: "linear-gradient(135deg, #6a11cb, #2575fc)", color: "white" },
            "Orthopedics": { background: "linear-gradient(135deg, #11998e, #38ef7d)", color: "white" },
            "Dermatology": { background: "linear-gradient(135deg, #f7971e, #ffd200)", color: "#333" },
            "Pediatrics": { background: "linear-gradient(135deg, #ff9a9e, #ffb199)", color: "white" }
        };
        return styles[name] || { background: "#fdfdfd", color: "#2c3e50" };
    };

    return (
        <div className="page-container">
            <h1>Welcome to Hospital Management System</h1>
            <p style={{ fontSize: '1.2rem', color: '#555' }}>Your health is our priority.</p>

            <div className="specialties-section" style={{ marginTop: '40px' }}>
                <h2>Our Specialties</h2>
                {specialties.length === 0 ? (
                    <p>No specialties available at the moment.</p>
                ) : (
                    <ul className="specialty-list" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', listStyle: 'none', padding: 0, justifyContent: 'center', marginTop: '20px' }}>
                        {specialties.map((spec) => {
                            const style = getSpecialtyStyle(spec.name);
                            return (
                                <li key={spec.id} className="specialty-card" style={{ 
                                    background: style.background, 
                                    padding: '20px', 
                                    borderRadius: '12px', 
                                    width: '250px', 
                                    boxShadow: '0 8px 15px rgba(0,0,0,0.1)', 
                                    textAlign: 'left',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 12px 20px rgba(0,0,0,0.15)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 8px 15px rgba(0,0,0,0.1)'; }}
                                >
                                    <h3 style={{ color: style.color, marginTop: 0 }}>{spec.name}</h3>
                                    <p style={{ color: style.color, opacity: 0.9, fontSize: '0.95em', lineHeight: '1.4' }}>
                                        {spec.description || getSpecialtyDescription(spec.name)}
                                    </p>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Home;
