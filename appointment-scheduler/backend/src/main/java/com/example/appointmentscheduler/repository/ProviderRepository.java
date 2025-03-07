package com.example.appointmentscheduler.repository;

import com.example.appointmentscheduler.model.Provider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProviderRepository extends JpaRepository<Provider, Long> {
    List<Provider> findBySpecialty(String specialty);
    Optional<Provider> findByEmail(String email);
    List<Provider> findByNameContainingIgnoreCase(String name);
    boolean existsByEmail(String email);
}
