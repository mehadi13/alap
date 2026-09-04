package com.alap.demo.config;

import com.alap.demo.dto.ApiResponseDto;
import com.alap.demo.dto.FieldErrorDetailDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponseDto<List<FieldErrorDetailDto>>> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        List<FieldErrorDetailDto> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> new FieldErrorDetailDto(error.getField(), error.getDefaultMessage()))
                .toList();

        log.warn("Validation failed for request: {}", errors);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ApiResponseDto.error("Validation failed for input fields", errors));
    }

    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    public ResponseEntity<ApiResponseDto<Void>> handleHttpMediaTypeNotSupportedException(
            HttpMediaTypeNotSupportedException ex) {
        log.warn("Unsupported Media Type: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
                .body(ApiResponseDto.error("Content type is not supported: " + ex.getContentType()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponseDto<Void>> handleGeneralException(Exception ex) {
        log.error("Unhandled exception caught in GlobalExceptionHandler", ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponseDto.error("An unexpected error occurred: " + ex.getMessage()));
    }
}
