import React, { useEffect, useState } from 'react';
import { getSpecialties } from '../services/api';

const Home = () => {
    const [specialties, setSpecialties] = useState([]);

    useEffect(() => {
        const fetchSpecialties = async () => {
            try {
                const response = await getSpecialties();
                setSpecialties(response.data);
            } catch (err) {
                console.error("Error fetching specialties:", err);
            }
        };

        fetchSpecialties();
    }, []);

    return (
        <div className="page-container">
            <h1>Welcome to Hospital Management System</h1>
            <p>Your health is our priority.</p>

            <div className="specialties-section">
                <h2>Our Specialties</h2>
                {specialties.length === 0 ? (
                    <p>No specialties available at the moment.</p>
                ) : (
                    <ul className="specialty-list">
                        {specialties.map((spec) => (
                            <li key={spec.id} className="specialty-card">
                                <h3>{spec.name}</h3>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Home;
