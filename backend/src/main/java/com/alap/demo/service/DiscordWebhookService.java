package com.alap.demo.service;

import com.alap.demo.dto.ConsultationRequestDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.*;

@Service
public class DiscordWebhookService {

    private static final Logger log = LoggerFactory.getLogger(DiscordWebhookService.class);

    @Value("${alap.discord.webhook-url}")
    private String webhookUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public boolean sendConsultationNotification(ConsultationRequestDto request) {
        if (webhookUrl == null || webhookUrl.isBlank() || webhookUrl.contains("your-default-webhook-url")) {
            log.warn("DISCORD_WEBHOOK_URL is not configured. Request logged locally: {}", request);
            return true;
        }

        try {
            Map<String, Object> embed = new LinkedHashMap<>();
            embed.put("title", "🚀 New Consultation Request — ALAP (আলাপ)");
            embed.put("color", 0x5B5CE2); // ALAP Accent Indigo Color
            embed.put("description", "**Problem Description:**\n" + request.problemDescription());

            List<Map<String, Object>> fields = new ArrayList<>();
            fields.add(createField("👤 Client Name", request.name(), true));
            fields.add(createField("📧 Email", request.email(), true));
            fields.add(createField("📞 Phone Number", request.phone(), true));
            fields.add(createField("🏢 Company", defaultValue(request.company()), true));
            fields.add(createField("📊 Business Type", defaultValue(request.businessType()), true));
            fields.add(createField("💬 Preferred Contact", defaultValue(request.preferredContact()).toUpperCase(), true));

            embed.put("fields", fields);
            embed.put("timestamp", Instant.now().toString());

            Map<String, String> footer = new HashMap<>();
            footer.put("text", "ALAP Backend Service (Java 21 / Spring Boot 3.4)");
            embed.put("footer", footer);

            Map<String, Object> payload = new HashMap<>();
            payload.put("username", "ALAP Backend Service");
            payload.put("avatar_url", "https://raw.githubusercontent.com/shadcn.png");
            payload.put("embeds", List.of(embed));

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);
            restTemplate.postForEntity(webhookUrl, entity, String.class);

            log.info("Successfully dispatched consultation notification to Discord for client: {}", request.name());
            return true;
        } catch (Exception e) {
            log.error("Failed to send Discord webhook notification for client: {}", request.name(), e);
            return false;
        }
    }

    private Map<String, Object> createField(String name, String value, boolean inline) {
        Map<String, Object> field = new HashMap<>();
        field.put("name", name);
        field.put("value", value);
        field.put("inline", inline);
        return field;
    }

    private String defaultValue(String val) {
        return (val != null && !val.isBlank()) ? val : "N/A";
    }
}
