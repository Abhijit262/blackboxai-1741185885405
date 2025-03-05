import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppointment } from '../context/AppointmentContext';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './ScheduleAppointment.css';

const ScheduleAppointment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const preSelectedProviderId = queryParams.get('provider');

    const { providers, fetchProviders, createAppointment } = useAppointment();
    
    const [selectedProvider, setSelectedProvider] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('');
    const [patientName, setPatientName] = useState('');
    const [patientEmail, setPatientEmail] = useState('');
    const [patientPhone, setPatientPhone] = useState('');
    const [notes, setNotes] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetchProviders();
        if (preSelectedProviderId) {
            setSelectedProvider(preSelectedProviderId);
        }
    }, [fetchProviders, preSelectedProviderId]);

    // Generate available time slots
    const generateTimeSlots = () => {
        const slots = [];
        for (let hour = 9; hour <= 17; hour++) {
            for (let minute of ['00', '30']) {
                slots.push(`${hour.toString().padStart(2, '0')}:${minute}`);
            }
        }
        return slots;
    };

    const timeSlots = generateTimeSlots();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!selectedTime) {
            setError('Please select an appointment time');
            return;
        }

        // Combine date and time
        const [hours, minutes] = selectedTime.split(':');
        const appointmentDateTime = new Date(selectedDate);
        appointmentDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

        try {
            const appointmentData = {
                provider: { id: selectedProvider },
                patientName,
                patientEmail,
                patientPhone,
                appointmentDateTime: appointmentDateTime.toISOString(),
                notes,
                status: 'SCHEDULED'
            };

            await createAppointment(appointmentData);
            setSuccess(true);
            setTimeout(() => {
                navigate('/appointments');
            }, 2000);
        } catch (err) {
            setError('Failed to schedule appointment. Please try again.');
            console.error('Error scheduling appointment:', err);
        }
    };

    return (
        <div className="schedule-appointment-page">
            <h1>Schedule an Appointment</h1>

            {success ? (
                <div className="alert alert-success">
                    Appointment scheduled successfully! Redirecting to appointments...
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="appointment-form">
                    {error && <div className="alert alert-error">{error}</div>}

                    <div className="form-group">
                        <label>Select Provider:</label>
                        <select
                            value={selectedProvider}
                            onChange={(e) => setSelectedProvider(e.target.value)}
                            required
                        >
                            <option value="">Choose a provider</option>
                            {providers.map(provider => (
                                <option key={provider.id} value={provider.id}>
                                    Dr. {provider.name} - {provider.specialty}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Select Date:</label>
                        <Calendar
                            onChange={setSelectedDate}
                            value={selectedDate}
                            minDate={new Date()}
                            className="calendar"
                        />
                    </div>

                    <div className="form-group">
                        <label>Select Time:</label>
                        <select
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                            required
                        >
                            <option value="">Choose a time</option>
                            {timeSlots.map(time => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Your Name:</label>
                        <input
                            type="text"
                            value={patientName}
                            onChange={(e) => setPatientName(e.target.value)}
                            required
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={patientEmail}
                            onChange={(e) => setPatientEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone:</label>
                        <input
                            type="tel"
                            value={patientPhone}
                            onChange={(e) => setPatientPhone(e.target.value)}
                            placeholder="Enter your phone number"
                        />
                    </div>

                    <div className="form-group">
                        <label>Notes (Optional):</label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Add any notes or special requests"
                            rows="3"
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={() => navigate(-1)} className="button button-secondary">
                            Cancel
                        </button>
                        <button type="submit" className="button button-primary">
                            Schedule Appointment
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ScheduleAppointment;
