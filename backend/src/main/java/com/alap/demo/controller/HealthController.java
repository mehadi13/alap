package com.alap.demo.controller;

import com.alap.demo.dto.ApiResponseDto;
import com.alap.demo.dto.HealthStatusDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/health")
public class HealthController {

    @GetMapping
    public ResponseEntity<ApiResponseDto<HealthStatusDto>> checkHealth() {
        HealthStatusDto statusInfo = new HealthStatusDto(
                "UP",
                "ALAP Backend Service",
                System.getProperty("java.version"),
                "Spring Boot 3.4 / Java 21"
        );
        return ResponseEntity.ok(ApiResponseDto.success("Service is operational", statusInfo));
    }
}
