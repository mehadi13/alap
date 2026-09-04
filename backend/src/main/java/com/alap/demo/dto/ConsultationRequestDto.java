package com.alap.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public record ConsultationRequestDto(
        String name,
        String email,
        String phone,
        String company,
        String businessType,
        String problemDescription,
        String preferredContact,
        String website,
        String teamSize
) {}
