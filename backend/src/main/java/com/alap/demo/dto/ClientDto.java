package com.alap.demo.dto;

import com.alap.demo.model.Client;

public record ClientDto(
    Long id,
    String clientCode,
    String name,
    String company,
    String email,
    String phone,
    String industry,
    String solution,
    String status,
    String monthlyValue,
    String startDate,
    String lastContact,
    String notes
) {
    public static ClientDto fromEntity(Client client) {
        return new ClientDto(
            client.getId(),
            client.getClientCode() != null ? client.getClientCode() : "CLT-" + (1000 + client.getId()),
            client.getName(),
            client.getCompany(),
            client.getEmail(),
            client.getPhone(),
            client.getIndustry(),
            client.getSolution(),
            client.getStatus(),
            client.getMonthlyValue(),
            client.getStartDate(),
            client.getLastContact(),
            client.getNotes()
        );
    }
}
