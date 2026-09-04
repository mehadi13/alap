package com.alap.demo.dto;

public record ClientRequestDto(
    String name,
    String company,
    String email,
    String phone,
    String industry,
    String solution,
    String status,
    String monthlyValue,
    String notes
) {}
