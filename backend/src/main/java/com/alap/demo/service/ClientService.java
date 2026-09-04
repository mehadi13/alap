package com.alap.demo.service;

import com.alap.demo.dto.ClientDto;
import com.alap.demo.dto.ClientRequestDto;
import com.alap.demo.model.Client;
import com.alap.demo.model.Consultation;
import com.alap.demo.repository.ClientRepository;
import com.alap.demo.repository.ConsultationRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClientService {

    private final ClientRepository clientRepository;
    private final ConsultationRepository consultationRepository;

    @Autowired
    public ClientService(ClientRepository clientRepository, ConsultationRepository consultationRepository) {
        this.clientRepository = clientRepository;
        this.consultationRepository = consultationRepository;
    }

    public List<ClientDto> getAllClients() {
        return clientRepository.findAll(Sort.by(Sort.Direction.DESC, "id"))
                .stream()
                .map(ClientDto::fromEntity)
                .collect(Collectors.toList());
    }

    public ClientDto getClientById(Long id) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Client not found with id: " + id));
        return ClientDto.fromEntity(client);
    }

    @Transactional
    public ClientDto createClient(ClientRequestDto dto) {
        long count = clientRepository.count();
        String code = "CLT-" + (1001 + count);

        Client client = new Client(
            code,
            dto.name(),
            dto.company(),
            dto.email(),
            dto.phone(),
            dto.industry() != null ? dto.industry() : "E-Commerce",
            dto.solution() != null ? dto.solution() : "Customer Support Automation",
            dto.status() != null ? dto.status() : "Onboarding",
            dto.monthlyValue() != null ? dto.monthlyValue() : "$0 / mo",
            LocalDate.now().toString(),
            LocalDate.now().toString(),
            dto.notes() != null ? dto.notes() : "Initial onboarding client profile."
        );

        Client saved = clientRepository.save(client);
        return ClientDto.fromEntity(saved);
    }

    @Transactional
    public ClientDto updateClient(Long id, ClientRequestDto dto) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Client not found with id: " + id));

        if (dto.name() != null) client.setName(dto.name());
        if (dto.company() != null) client.setCompany(dto.company());
        if (dto.email() != null) client.setEmail(dto.email());
        if (dto.phone() != null) client.setPhone(dto.phone());
        if (dto.industry() != null) client.setIndustry(dto.industry());
        if (dto.solution() != null) client.setSolution(dto.solution());
        if (dto.status() != null) client.setStatus(dto.status());
        if (dto.monthlyValue() != null) client.setMonthlyValue(dto.monthlyValue());
        if (dto.notes() != null) client.setNotes(dto.notes());

        client.setLastContact(LocalDate.now().toString());

        Client saved = clientRepository.save(client);
        return ClientDto.fromEntity(saved);
    }

    @Transactional
    public void deleteClient(Long id) {
        if (!clientRepository.existsById(id)) {
            throw new RuntimeException("Client not found with id: " + id);
        }
        clientRepository.deleteById(id);
    }

    @Transactional
    public ClientDto convertConsultationToClient(String consultationId) {
        Consultation consultation = consultationRepository.findById(consultationId)
                .orElseThrow(() -> new RuntimeException("Consultation lead not found: " + consultationId));

        consultation.setStatus("Converted");
        consultationRepository.save(consultation);

        Optional<Client> existing = clientRepository.findByEmail(consultation.getEmail());
        if (existing.isPresent()) {
            return ClientDto.fromEntity(existing.get());
        }

        long count = clientRepository.count();
        String code = "CLT-" + (1001 + count);

        Client client = new Client(
            code,
            consultation.getName(),
            consultation.getCompany() != null ? consultation.getCompany() : consultation.getName() + "'s Business",
            consultation.getEmail(),
            consultation.getPhone() != null ? consultation.getPhone() : "+880 1700-000000",
            consultation.getBusinessType() != null ? consultation.getBusinessType() : "General Industry",
            "Custom Workflow Automation",
            "Onboarding",
            "$0 / mo",
            LocalDate.now().toString(),
            LocalDate.now().toString(),
            "Converted from Consultation Lead #" + consultationId + ". Problem: " + (consultation.getProblemDescription() != null ? consultation.getProblemDescription() : "N/A")
        );

        Client saved = clientRepository.save(client);
        return ClientDto.fromEntity(saved);
    }
}
