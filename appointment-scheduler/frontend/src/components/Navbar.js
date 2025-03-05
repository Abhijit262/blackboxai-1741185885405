import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="navbar-logo">
                    Appointment Scheduler
                </Link>
            </div>
            <div className="navbar-links">
                <Link to="/" className={`nav-link ${isActive('/')}`}>
                    Home
                </Link>
                <Link to="/providers" className={`nav-link ${isActive('/providers')}`}>
                    Providers
                </Link>
                <Link to="/appointments" className={`nav-link ${isActive('/appointments')}`}>
                    Appointments
                </Link>
                <Link to="/schedule" className={`nav-link ${isActive('/schedule')}`}>
                    Schedule New
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
