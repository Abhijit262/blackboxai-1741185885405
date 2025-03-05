package com.example.appointmentscheduler.repository;

import com.example.appointmentscheduler.model.Appointment;
import com.example.appointmentscheduler.model.Provider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    
    List<Appointment> findByProvider(Provider provider);
    
    List<Appointment> findByPatientEmail(String patientEmail);
    
    List<Appointment> findByAppointmentDateTimeBetween(
        LocalDateTime startDateTime, 
        LocalDateTime endDateTime
    );
    
    @Query("SELECT a FROM Appointment a WHERE a.provider = ?1 AND a.appointmentDateTime BETWEEN ?2 AND ?3")
    List<Appointment> findProviderAppointmentsForDateRange(
        Provider provider, 
        LocalDateTime startDateTime, 
        LocalDateTime endDateTime
    );
    
    List<Appointment> findByProviderAndStatus(
        Provider provider, 
        Appointment.AppointmentStatus status
    );
    
    @Query("SELECT COUNT(a) > 0 FROM Appointment a " +
           "WHERE a.provider = ?1 AND a.appointmentDateTime = ?2")
    boolean isTimeSlotTaken(Provider provider, LocalDateTime dateTime);
}
