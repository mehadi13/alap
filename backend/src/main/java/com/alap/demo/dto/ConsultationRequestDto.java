package com.alap.demo.dto;

public record ConsultationRequestDto(
        String name,
        String email,
        String phone,
        String company,
        String businessType,
        String problemDescription,
        String preferredContact,
        String channelType,
        String website,
        String teamSize
) {}
