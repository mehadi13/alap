package com.alap.demo.dto;

import java.time.LocalDateTime;

public record ConsultationResponseDto(
        String id,
        String name,
        String email,
        String phone,
        String company,
        String businessType,
        String problemDescription,
        String preferredContact,
        String type,
        String channelType,
        Integer durationSeconds,
        String audioFileUrl,
        String status,
        LocalDateTime createdAt
) {}
