package com.alap.demo.dto;

import java.time.LocalDateTime;

public record ApiResponseDto<T>(
        boolean success,
        String message,
        T data,
        LocalDateTime timestamp
) {
    public ApiResponseDto(boolean success, String message, T data) {
        this(success, message, data, LocalDateTime.now());
    }

    public static <T> ApiResponseDto<T> success(String message, T data) {
        return new ApiResponseDto<>(true, message, data, LocalDateTime.now());
    }

    public static <T> ApiResponseDto<T> success(String message) {
        return success(message, null);
    }

    public static <T> ApiResponseDto<T> error(String message, T data) {
        return new ApiResponseDto<>(false, message, data, LocalDateTime.now());
    }

    public static <T> ApiResponseDto<T> error(String message) {
        return error(message, null);
    }
}