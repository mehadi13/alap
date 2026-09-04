package com.alap.demo.dto;

import com.alap.demo.model.Role;
import java.time.LocalDateTime;

public record UserDto(
        String id,
        String name,
        String email,
        String company,
        String phone,
        Role role,
        LocalDateTime createdAt
) {}
