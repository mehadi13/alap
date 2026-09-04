package com.alap.demo.dto;

public record AuthResponseDto(
        String token,
        UserDto user
) {}
