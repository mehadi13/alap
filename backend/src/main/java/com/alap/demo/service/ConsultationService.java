package com.alap.demo.service;

import com.alap.demo.dto.ConsultationRequestDto;
import com.alap.demo.dto.ConsultationResponseDto;
import com.alap.demo.model.Consultation;
import com.alap.demo.repository.ConsultationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class ConsultationService {

    private static final Logger log = LoggerFactory.getLogger(ConsultationService.class);
    private static final Path UPLOAD_DIR = Paths.get("uploads", "voice-notes");

    private final ConsultationRepository consultationRepository;

    public ConsultationService(ConsultationRepository consultationRepository) {
        this.consultationRepository = consultationRepository;
        initUploadDirectory();
    }

    private void initUploadDirectory() {
        try {
            if (!Files.exists(UPLOAD_DIR)) {
                Files.createDirectories(UPLOAD_DIR);
                log.info("Created upload directory for voice notes: {}", UPLOAD_DIR.toAbsolutePath());
            }
        } catch (IOException e) {
            log.error("Could not initialize upload directory for voice notes", e);
        }
    }

    public ConsultationResponseDto saveConsultation(ConsultationRequestDto request) {
        String id = "cns-" + UUID.randomUUID().toString().substring(0, 8);
        String company = (request.company() != null && !request.company().isBlank())
                ? request.company()
                : (request.name() != null ? request.name() + " Business" : "Independent Client");

        String type = "TEXT";
        if (request.problemDescription() != null) {
            if (request.problemDescription().contains("[CALL BACK REQUEST]")) {
                type = "CALL";
            } else if (request.problemDescription().contains("[MEETING REQUEST]")) {
                type = "MEETING";
            }
        }

        String channelType = request.channelType();
        if (channelType == null || channelType.isBlank()) {
            if ("CALL".equals(type)) {
                channelType = "call";
            } else if ("MEETING".equals(type)) {
                channelType = "meeting";
            } else {
                channelType = "message";
            }
        }

        Consultation consultation = new Consultation(
                id,
                request.name(),
                request.email(),
                request.phone(),
                company,
                request.businessType(),
                request.problemDescription(),
                request.preferredContact() != null ? request.preferredContact() : "phone",
                type,
                channelType,
                0,
                null,
                "New",
                LocalDateTime.now()
        );

        Consultation saved = consultationRepository.save(consultation);
        return mapToDto(saved);
    }

    public ConsultationResponseDto saveVoiceConsultation(String name, String phone, String email,
                                                        String durationSecondsStr, MultipartFile file) {
        String id = "cns-voice-" + UUID.randomUUID().toString().substring(0, 8);
        int duration = 0;
        try {
            if (durationSecondsStr != null) {
                duration = Integer.parseInt(durationSecondsStr);
            }
        } catch (NumberFormatException ignored) {}

        String clientEmail = (email != null && !email.isBlank()) ? email : "voice-message@alap.ai";
        String audioFileUrl = null;

        // Save incoming audio file to disk folder
        if (file != null && !file.isEmpty()) {
            try {
                String originalFilename = file.getOriginalFilename();
                String ext = ".webm";
                if (originalFilename != null && originalFilename.contains(".")) {
                    ext = originalFilename.substring(originalFilename.lastIndexOf("."));
                }
                String storedFilename = id + "_" + System.currentTimeMillis() + ext;
                Path targetLocation = UPLOAD_DIR.resolve(storedFilename);

                Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
                log.info("Saved voice message file to disk: {}", targetLocation.toAbsolutePath());

                audioFileUrl = "http://localhost:8080/api/v1/consultation/audio/" + storedFilename;
            } catch (IOException ex) {
                log.error("Failed to save audio file to disk for client: {}", name, ex);
            }
        }

        String fileNameLabel = (file != null && file.getOriginalFilename() != null) ? file.getOriginalFilename() : "Audio Note";
        String problemDesc = "🎙️ [VOICE NOTE] Client recorded a " + duration + "s voice note (" + fileNameLabel + ")";

        Consultation consultation = new Consultation(
                id,
                name,
                clientEmail,
                phone,
                name + " (Voice Lead)",
                "Voice Note",
                problemDesc,
                "whatsapp",
                "VOICE",
                "voice note",
                duration,
                audioFileUrl,
                "New",
                LocalDateTime.now()
        );

        Consultation saved = consultationRepository.save(consultation);
        return mapToDto(saved);
    }

    public Resource loadAudioResource(String filename) {
        try {
            Path filePath = UPLOAD_DIR.resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists() && resource.isReadable()) {
                return resource;
            } else {
                log.warn("Audio file resource not found or unreadable: {}", filename);
                return null;
            }
        } catch (MalformedURLException ex) {
            log.error("Error creating UrlResource for audio file: {}", filename, ex);
            return null;
        }
    }

    public Page<ConsultationResponseDto> getPaginatedConsultations(String status, Pageable pageable) {
        Page<Consultation> page;
        if (status != null && !status.isBlank() && !"All".equalsIgnoreCase(status)) {
            page = consultationRepository.findByStatusIgnoreCase(status, pageable);
        } else {
            page = consultationRepository.findAll(pageable);
        }
        return page.map(this::mapToDto);
    }

    public List<ConsultationResponseDto> getAllConsultations() {
        return consultationRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    public ConsultationResponseDto updateConsultationStatus(String id, String newStatus) {
        Consultation consultation = consultationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Consultation not found with id: " + id));

        consultation.setStatus(newStatus);
        Consultation updated = consultationRepository.save(consultation);
        return mapToDto(updated);
    }

    private ConsultationResponseDto mapToDto(Consultation entity) {
        return new ConsultationResponseDto(
                entity.getId(),
                entity.getName(),
                entity.getEmail(),
                entity.getPhone(),
                entity.getCompany(),
                entity.getBusinessType(),
                entity.getProblemDescription(),
                entity.getPreferredContact(),
                entity.getType(),
                entity.getChannelType() != null ? entity.getChannelType() : ("VOICE".equalsIgnoreCase(entity.getType()) ? "voice note" : "message"),
                entity.getDurationSeconds(),
                entity.getAudioFileUrl(),
                entity.getStatus(),
                entity.getCreatedAt()
        );
    }
}
