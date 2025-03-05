package com.example.appointmentscheduler.controller;

import com.example.appointmentscheduler.model.Provider;
import com.example.appointmentscheduler.service.ProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/providers")
@CrossOrigin(origins = "http://localhost:3000")
public class ProviderController {

    private final ProviderService providerService;

    @Autowired
    public ProviderController(ProviderService providerService) {
        this.providerService = providerService;
    }

    @GetMapping
    public ResponseEntity<List<Provider>> getAllProviders() {
        return ResponseEntity.ok(providerService.getAllProviders());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Provider> getProviderById(@PathVariable Long id) {
        return ResponseEntity.ok(providerService.getProviderById(id));
    }

    @GetMapping("/specialty/{specialty}")
    public ResponseEntity<List<Provider>> getProvidersBySpecialty(@PathVariable String specialty) {
        return ResponseEntity.ok(providerService.getProvidersBySpecialty(specialty));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Provider>> searchProviders(@RequestParam String name) {
        return ResponseEntity.ok(providerService.searchProviders(name));
    }

    @PostMapping
    public ResponseEntity<Provider> createProvider(@RequestBody Provider provider) {
        Provider createdProvider = providerService.createProvider(provider);
        return ResponseEntity.ok(createdProvider);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Provider> updateProvider(
            @PathVariable Long id,
            @RequestBody Provider providerDetails) {
        return ResponseEntity.ok(providerService.updateProvider(id, providerDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProvider(@PathVariable Long id) {
        providerService.deleteProvider(id);
        return ResponseEntity.ok().build();
    }
}
