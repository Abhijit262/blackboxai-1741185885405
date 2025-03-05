import React, { createContext, useState, useContext, useCallback } from 'react';
import axios from 'axios';

const AppointmentContext = createContext();

export const useAppointment = () => {
    const context = useContext(AppointmentContext);
    if (!context) {
        throw new Error('useAppointment must be used within an AppointmentProvider');
    }
    return context;
};

export const AppointmentProvider = ({ children }) => {
    const [providers, setProviders] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_BASE_URL = 'http://localhost:8080/api';

    // Provider-related functions
    const fetchProviders = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/providers`);
            setProviders(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch providers');
            console.error('Error fetching providers:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const getProviderById = useCallback(async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/providers/${id}`);
            return response.data;
        } catch (err) {
            setError('Failed to fetch provider details');
            console.error('Error fetching provider:', err);
            return null;
        }
    }, []);

    // Appointment-related functions
    const fetchAppointments = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/appointments`);
            setAppointments(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch appointments');
            console.error('Error fetching appointments:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const createAppointment = useCallback(async (appointmentData) => {
        try {
            setLoading(true);
            const response = await axios.post(`${API_BASE_URL}/appointments`, appointmentData);
            setAppointments(prev => [...prev, response.data]);
            setError(null);
            return response.data;
        } catch (err) {
            setError('Failed to create appointment');
            console.error('Error creating appointment:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const updateAppointment = useCallback(async (id, appointmentData) => {
        try {
            setLoading(true);
            const response = await axios.put(`${API_BASE_URL}/appointments/${id}`, appointmentData);
            setAppointments(prev => 
                prev.map(apt => apt.id === id ? response.data : apt)
            );
            setError(null);
            return response.data;
        } catch (err) {
            setError('Failed to update appointment');
            console.error('Error updating appointment:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteAppointment = useCallback(async (id) => {
        try {
            setLoading(true);
            await axios.delete(`${API_BASE_URL}/appointments/${id}`);
            setAppointments(prev => prev.filter(apt => apt.id !== id));
            setError(null);
        } catch (err) {
            setError('Failed to delete appointment');
            console.error('Error deleting appointment:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const getProviderAppointments = useCallback(async (providerId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/appointments/provider/${providerId}`);
            return response.data;
        } catch (err) {
            setError('Failed to fetch provider appointments');
            console.error('Error fetching provider appointments:', err);
            return [];
        }
    }, []);

    const value = {
        providers,
        appointments,
        loading,
        error,
        fetchProviders,
        getProviderById,
        fetchAppointments,
        createAppointment,
        updateAppointment,
        deleteAppointment,
        getProviderAppointments
    };

    return (
        <AppointmentContext.Provider value={value}>
            {children}
        </AppointmentContext.Provider>
    );
};
