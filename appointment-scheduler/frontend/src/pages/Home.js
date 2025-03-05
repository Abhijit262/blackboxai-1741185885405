import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <div className="hero">
                <h1>Welcome to Appointment Scheduler</h1>
                <p>Schedule and manage your healthcare appointments with ease</p>
            </div>

            <div className="features-grid">
                <div className="feature-card">
                    <h3>Schedule Appointments</h3>
                    <p>Book appointments with healthcare providers at your convenience.</p>
                    <Link to="/schedule" className="button button-primary">
                        Schedule Now
                    </Link>
                </div>

                <div className="feature-card">
                    <h3>View Providers</h3>
                    <p>Browse our network of qualified healthcare providers.</p>
                    <Link to="/providers" className="button button-primary">
                        View Providers
                    </Link>
                </div>

                <div className="feature-card">
                    <h3>Manage Appointments</h3>
                    <p>View and manage your scheduled appointments.</p>
                    <Link to="/appointments" className="button button-primary">
                        View Appointments
                    </Link>
                </div>
            </div>

            <div className="info-section">
                <h2>Why Choose Us?</h2>
                <div className="benefits-grid">
                    <div className="benefit-item">
                        <h4>Easy Scheduling</h4>
                        <p>Book appointments in just a few clicks</p>
                    </div>
                    <div className="benefit-item">
                        <h4>Real-time Updates</h4>
                        <p>Get instant confirmation and updates</p>
                    </div>
                    <div className="benefit-item">
                        <h4>Flexible Management</h4>
                        <p>Easily reschedule or cancel appointments</p>
                    </div>
                    <div className="benefit-item">
                        <h4>Provider Choice</h4>
                        <p>Choose from our network of providers</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
