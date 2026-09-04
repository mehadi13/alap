package com.alap.demo.dto;

public record HealthStatusDto(
        String status,
        String service,
        String javaVersion,
        String framework
) {}
