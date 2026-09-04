package com.alap.demo.controller;

import com.alap.demo.dto.ApiResponseDto;
import com.alap.demo.dto.ConsultationRequestDto;
import com.alap.demo.dto.ConsultationResponseDto;
import com.alap.demo.dto.UpdateStatusRequestDto;
import com.alap.demo.service.ConsultationService;
import com.alap.demo.service.DiscordWebhookService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/consultation")
public class ConsultationController {

    private static final Logger log = LoggerFactory.getLogger(ConsultationController.class);

    private final DiscordWebhookService discordWebhookService;
    private final ConsultationService consultationService;

    public ConsultationController(DiscordWebhookService discordWebhookService,
                                  ConsultationService consultationService) {
        this.discordWebhookService = discordWebhookService;
        this.consultationService = consultationService;
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponseDto<ConsultationResponseDto>> submitConsultation(
            @Valid @RequestBody ConsultationRequestDto request) {
        log.info("Received consultation request from: {} ({})", request.name(), request.email());

        // Save to Database
        ConsultationResponseDto saved = consultationService.saveConsultation(request);

        // Dispatch notification
        discordWebhookService.sendConsultationNotification(request);

        return ResponseEntity.ok(ApiResponseDto.success("Consultation request received successfully!", saved));
    }

    @PostMapping(value = "/voice", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponseDto<ConsultationResponseDto>> submitVoiceConsultation(
            @RequestParam("name") String name,
            @RequestParam("phone") String phone,
            @RequestParam(value = "email", required = false) String email,
            @RequestParam(value = "durationSeconds", defaultValue = "0") String durationSeconds,
            @RequestParam(value = "file", required = false) org.springframework.web.multipart.MultipartFile file
    ) {
        log.info("Received voice consultation note from: {} ({})", name, phone);

        // Save to Database & Disk
        ConsultationResponseDto saved = consultationService.saveVoiceConsultation(name, phone, email, durationSeconds, file);

        // Dispatch notification
        discordWebhookService.sendVoiceNoteNotification(name, phone, email, durationSeconds, file);

        return ResponseEntity.ok(ApiResponseDto.success("Voice note received successfully!", saved));
    }

    @GetMapping
    public ResponseEntity<ApiResponseDto<List<ConsultationResponseDto>>> getAllConsultations() {
        log.info("Fetching all consultation requests from DB");
        List<ConsultationResponseDto> consultations = consultationService.getAllConsultations();
        return ResponseEntity.ok(ApiResponseDto.success("Consultations retrieved successfully", consultations));
    }

    @GetMapping("/audio/{filename:.+}")
    public ResponseEntity<Resource> getAudioFile(@PathVariable("filename") String filename) {
        log.info("Streaming voice note audio file: {}", filename);
        Resource resource = consultationService.loadAudioResource(filename);
        if (resource == null) {
            return ResponseEntity.notFound().build();
        }

        String contentType = "audio/webm";
        if (filename.endsWith(".mp3")) {
            contentType = "audio/mpeg";
        } else if (filename.endsWith(".wav")) {
            contentType = "audio/wav";
        } else if (filename.endsWith(".ogg")) {
            contentType = "audio/ogg";
        } else if (filename.endsWith(".m4a") || filename.endsWith(".mp4")) {
            contentType = "audio/mp4";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @RequestMapping(value = "/{id}/status", method = {RequestMethod.PATCH, RequestMethod.PUT})
    public ResponseEntity<ApiResponseDto<ConsultationResponseDto>> updateStatus(
            @PathVariable("id") String id,
            @Valid @RequestBody UpdateStatusRequestDto request) {
        log.info("Updating status for consultation {} to {}", id, request.status());
        ConsultationResponseDto updated = consultationService.updateConsultationStatus(id, request.status());
        return ResponseEntity.ok(ApiResponseDto.success("Status updated successfully", updated));
    }
}
