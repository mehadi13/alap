package com.alap.demo.dto;

import jakarta.validation.constraints.NotBlank;

public record UpdateStatusRequestDto(
        @NotBlank(message = "Status cannot be blank")
        String status
) {}
