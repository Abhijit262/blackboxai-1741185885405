package com.example.appointmentscheduler.service;

import com.example.appointmentscheduler.model.Appointment;
import com.example.appointmentscheduler.model.Provider;
import com.example.appointmentscheduler.repository.AppointmentRepository;
import com.example.appointmentscheduler.repository.ProviderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final ProviderRepository providerRepository;

    @Autowired
    public AppointmentService(AppointmentRepository appointmentRepository, ProviderRepository providerRepository) {
        this.appointmentRepository = appointmentRepository;
        this.providerRepository = providerRepository;
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Appointment getAppointmentById(Long id) {
        return appointmentRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Appointment not found with id: " + id));
    }

    public List<Appointment> getAppointmentsByProvider(Long providerId) {
        Provider provider = providerRepository.findById(providerId)
            .orElseThrow(() -> new EntityNotFoundException("Provider not found with id: " + providerId));
        return appointmentRepository.findByProvider(provider);
    }

    public List<Appointment> getAppointmentsByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return appointmentRepository.findByAppointmentDateTimeBetween(startDate, endDate);
    }

    public Appointment createAppointment(Appointment appointment) {
        // Validate provider exists
        Provider provider = providerRepository.findById(appointment.getProvider().getId())
            .orElseThrow(() -> new EntityNotFoundException("Provider not found"));

        // Check if time slot is available
        if (appointmentRepository.isTimeSlotTaken(provider, appointment.getAppointmentDateTime())) {
            throw new IllegalStateException("This time slot is already taken");
        }

        appointment.setProvider(provider);
        appointment.setStatus(Appointment.AppointmentStatus.SCHEDULED);
        appointment.setCreatedAt(LocalDateTime.now());
        
        return appointmentRepository.save(appointment);
    }

    public Appointment updateAppointment(Long id, Appointment appointmentDetails) {
        Appointment appointment = getAppointmentById(id);
        
        // Update only allowed fields
        appointment.setPatientName(appointmentDetails.getPatientName());
        appointment.setPatientEmail(appointmentDetails.getPatientEmail());
        appointment.setPatientPhone(appointmentDetails.getPatientPhone());
        appointment.setNotes(appointmentDetails.getNotes());
        appointment.setStatus(appointmentDetails.getStatus());
        
        // If appointment time is being changed, check availability
        if (!appointment.getAppointmentDateTime().equals(appointmentDetails.getAppointmentDateTime())) {
            if (appointmentRepository.isTimeSlotTaken(appointment.getProvider(), 
                    appointmentDetails.getAppointmentDateTime())) {
                throw new IllegalStateException("New time slot is already taken");
            }
            appointment.setAppointmentDateTime(appointmentDetails.getAppointmentDateTime());
        }

        return appointmentRepository.save(appointment);
    }

    public void deleteAppointment(Long id) {
        if (!appointmentRepository.existsById(id)) {
            throw new EntityNotFoundException("Appointment not found with id: " + id);
        }
        appointmentRepository.deleteById(id);
    }

    public Appointment updateAppointmentStatus(Long id, Appointment.AppointmentStatus status) {
        Appointment appointment = getAppointmentById(id);
        appointment.setStatus(status);
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getProviderAppointmentsForDateRange(
            Long providerId, 
            LocalDateTime startDate, 
            LocalDateTime endDate) {
        Provider provider = providerRepository.findById(providerId)
            .orElseThrow(() -> new EntityNotFoundException("Provider not found with id: " + providerId));
        return appointmentRepository.findProviderAppointmentsForDateRange(provider, startDate, endDate);
    }
}
