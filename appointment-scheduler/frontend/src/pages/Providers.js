import React, { useEffect, useState } from 'react';
import { useAppointment } from '../context/AppointmentContext';
import './Providers.css';

const Providers = () => {
    const { providers, loading, error, fetchProviders } = useAppointment();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState('');

    useEffect(() => {
        fetchProviders();
    }, [fetchProviders]);

    // Get unique specialties for filter
    const specialties = [...new Set(providers.map(provider => provider.specialty))];

    // Filter providers based on search term and specialty
    const filteredProviders = providers.filter(provider => {
        const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            provider.specialty.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSpecialty = !selectedSpecialty || provider.specialty === selectedSpecialty;
        return matchesSearch && matchesSpecialty;
    });

    if (loading) {
        return <div className="loading-spinner"></div>;
    }

    if (error) {
        return <div className="alert alert-error">{error}</div>;
    }

    return (
        <div className="providers-page">
            <div className="providers-header">
                <h1>Healthcare Providers</h1>
                <div className="filters">
                    <input
                        type="text"
                        placeholder="Search providers..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        className="specialty-select"
                        value={selectedSpecialty}
                        onChange={(e) => setSelectedSpecialty(e.target.value)}
                    >
                        <option value="">All Specialties</option>
                        {specialties.map(specialty => (
                            <option key={specialty} value={specialty}>
                                {specialty}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="providers-grid">
                {filteredProviders.map(provider => (
                    <div key={provider.id} className="provider-card">
                        <div className="provider-info">
                            <h3>{provider.name}</h3>
                            <p className="specialty">{provider.specialty}</p>
                            {provider.email && (
                                <p className="email">
                                    <i className="fas fa-envelope"></i> {provider.email}
                                </p>
                            )}
                            {provider.phoneNumber && (
                                <p className="phone">
                                    <i className="fas fa-phone"></i> {provider.phoneNumber}
                                </p>
                            )}
                            {provider.description && (
                                <p className="description">{provider.description}</p>
                            )}
                        </div>
                        <div className="provider-actions">
                            <button 
                                onClick={() => window.location.href = `/schedule?provider=${provider.id}`}
                                className="button button-primary"
                            >
                                Schedule Appointment
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredProviders.length === 0 && (
                <div className="no-results">
                    <p>No providers found matching your criteria.</p>
                </div>
            )}
        </div>
    );
};

export default Providers;
