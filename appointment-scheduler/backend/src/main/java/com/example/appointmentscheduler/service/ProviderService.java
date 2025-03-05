package com.example.appointmentscheduler.service;

import com.example.appointmentscheduler.model.Provider;
import com.example.appointmentscheduler.repository.ProviderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
@Transactional
public class ProviderService {

    private final ProviderRepository providerRepository;

    @Autowired
    public ProviderService(ProviderRepository providerRepository) {
        this.providerRepository = providerRepository;
    }

    public List<Provider> getAllProviders() {
        return providerRepository.findAll();
    }

    public Provider getProviderById(Long id) {
        return providerRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Provider not found with id: " + id));
    }

    public List<Provider> getProvidersBySpecialty(String specialty) {
        return providerRepository.findBySpecialty(specialty);
    }

    public Provider createProvider(Provider provider) {
        if (providerRepository.existsByEmail(provider.getEmail())) {
            throw new IllegalArgumentException("Provider with this email already exists");
        }
        return providerRepository.save(provider);
    }

    public Provider updateProvider(Long id, Provider providerDetails) {
        Provider provider = getProviderById(id);
        
        provider.setName(providerDetails.getName());
        provider.setSpecialty(providerDetails.getSpecialty());
        provider.setEmail(providerDetails.getEmail());
        provider.setPhoneNumber(providerDetails.getPhoneNumber());
        provider.setDescription(providerDetails.getDescription());

        return providerRepository.save(provider);
    }

    public void deleteProvider(Long id) {
        if (!providerRepository.existsById(id)) {
            throw new EntityNotFoundException("Provider not found with id: " + id);
        }
        providerRepository.deleteById(id);
    }

    public List<Provider> searchProviders(String name) {
        return providerRepository.findByNameContainingIgnoreCase(name);
    }
}
