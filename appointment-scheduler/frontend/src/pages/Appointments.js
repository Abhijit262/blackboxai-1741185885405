import React, { useEffect, useState } from 'react';
import { useAppointment } from '../context/AppointmentContext';
import './Appointments.css';

const Appointments = () => {
    const { 
        appointments, 
        loading, 
        error, 
        fetchAppointments, 
        updateAppointment, 
        deleteAppointment 
    } = useAppointment();

    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchAppointments();
    }, [fetchAppointments]);

    const handleStatusChange = async (appointmentId, newStatus) => {
        try {
            await updateAppointment(appointmentId, { status: newStatus });
        } catch (err) {
            console.error('Error updating appointment status:', err);
        }
    };

    const handleDelete = async (appointmentId) => {
        if (window.confirm('Are you sure you want to cancel this appointment?')) {
            try {
                await deleteAppointment(appointmentId);
            } catch (err) {
                console.error('Error deleting appointment:', err);
            }
        }
    };

    const filteredAppointments = appointments.filter(appointment => {
        if (filter === 'all') return true;
        return appointment.status.toLowerCase() === filter.toLowerCase();
    });

    const formatDateTime = (dateTime) => {
        return new Date(dateTime).toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short'
        });
    };

    if (loading) {
        return <div className="loading-spinner"></div>;
    }

    if (error) {
        return <div className="alert alert-error">{error}</div>;
    }

    return (
        <div className="appointments-page">
            <div className="appointments-header">
                <h1>My Appointments</h1>
                <div className="filter-controls">
                    <select 
                        value={filter} 
                        onChange={(e) => setFilter(e.target.value)}
                        className="status-filter"
                    >
                        <option value="all">All Appointments</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            <div className="appointments-list">
                {filteredAppointments.length === 0 ? (
                    <div className="no-appointments">
                        <p>No appointments found.</p>
                    </div>
                ) : (
                    filteredAppointments.map(appointment => (
                        <div key={appointment.id} className={`appointment-card status-${appointment.status.toLowerCase()}`}>
                            <div className="appointment-info">
                                <h3>Appointment with Dr. {appointment.provider.name}</h3>
                                <p className="specialty">{appointment.provider.specialty}</p>
                                <p className="datetime">
                                    <i className="fas fa-calendar"></i>
                                    {formatDateTime(appointment.appointmentDateTime)}
                                </p>
                                <p className="status">
                                    Status: <span className={`status-badge ${appointment.status.toLowerCase()}`}>
                                        {appointment.status}
                                    </span>
                                </p>
                                {appointment.notes && (
                                    <p className="notes">{appointment.notes}</p>
                                )}
                            </div>
                            
                            <div className="appointment-actions">
                                {appointment.status !== 'CANCELLED' && appointment.status !== 'COMPLETED' && (
                                    <>
                                        <select
                                            value={appointment.status}
                                            onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                                            className="status-select"
                                        >
                                            <option value="SCHEDULED">Scheduled</option>
                                            <option value="CONFIRMED">Confirmed</option>
                                            <option value="COMPLETED">Completed</option>
                                        </select>
                                        <button
                                            onClick={() => handleDelete(appointment.id)}
                                            className="button button-danger"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Appointments;
