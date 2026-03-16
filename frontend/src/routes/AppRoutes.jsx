import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Doctors from '../pages/Doctors';
import Appointment from '../pages/Appointment';

const AppRoutes = () => {
    return (
        <Router>
            <div className="app-container">
                <nav className="navbar">
                    <h2>Hospital Management System</h2>
                    <div className="nav-links">
                        <a href="/">Home</a>
                        <a href="/doctors">Doctors</a>
                        <a href="/login">Login</a>
                        <a href="/register">Register</a>
                    </div>
                </nav>
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/doctors" element={<Doctors />} />
                        <Route path="/book-appointment" element={<Appointment />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default AppRoutes;
