package com.alap.demo.controller;

import com.alap.demo.dto.ApiResponseDto;
import com.alap.demo.dto.ClientDto;
import com.alap.demo.dto.ClientRequestDto;
import com.alap.demo.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/clients")
public class ClientController {

    private final ClientService clientService;

    @Autowired
    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping
    public ResponseEntity<ApiResponseDto<List<ClientDto>>> getAllClients() {
        List<ClientDto> clients = clientService.getAllClients();
        return ResponseEntity.ok(ApiResponseDto.success("Clients retrieved successfully", clients));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponseDto<ClientDto>> getClientById(@PathVariable Long id) {
        ClientDto client = clientService.getClientById(id);
        return ResponseEntity.ok(ApiResponseDto.success("Client profile retrieved", client));
    }

    @PostMapping
    public ResponseEntity<ApiResponseDto<ClientDto>> createClient(@RequestBody ClientRequestDto requestDto) {
        ClientDto created = clientService.createClient(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponseDto.success("Client profile created successfully", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponseDto<ClientDto>> updateClient(
            @PathVariable Long id,
            @RequestBody ClientRequestDto requestDto) {
        ClientDto updated = clientService.updateClient(id, requestDto);
        return ResponseEntity.ok(ApiResponseDto.success("Client profile updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponseDto<Void>> deleteClient(@PathVariable Long id) {
        clientService.deleteClient(id);
        return ResponseEntity.ok(ApiResponseDto.success("Client deleted successfully", null));
    }

    @PostMapping("/convert/{consultationId}")
    public ResponseEntity<ApiResponseDto<ClientDto>> convertConsultationToClient(@PathVariable String consultationId) {
        ClientDto converted = clientService.convertConsultationToClient(consultationId);
        return ResponseEntity.ok(ApiResponseDto.success("Consultation lead converted to client profile", converted));
    }
}
