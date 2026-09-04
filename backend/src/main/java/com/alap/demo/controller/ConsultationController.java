package com.alap.demo.controller;

import com.alap.demo.dto.ApiResponseDto;
import com.alap.demo.dto.ConsultationRequestDto;
import com.alap.demo.service.DiscordWebhookService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/consultation")
public class ConsultationController {

    private static final Logger log = LoggerFactory.getLogger(ConsultationController.class);

    private final DiscordWebhookService discordWebhookService;

    public ConsultationController(DiscordWebhookService discordWebhookService) {
        this.discordWebhookService = discordWebhookService;
    }

    @PostMapping
    public ResponseEntity<ApiResponseDto<Void>> submitConsultation(
            @Valid @RequestBody ConsultationRequestDto request) {
        log.info("Received consultation request from: {} ({})", request.name(), request.email());

        boolean sent = discordWebhookService.sendConsultationNotification(request);

        if (sent) {
            return ResponseEntity.ok(ApiResponseDto.success("Consultation request received successfully!"));
        } else {
            return ResponseEntity.internalServerError()
                    .body(ApiResponseDto.error("Failed to process consultation request"));
        }
    }
}
