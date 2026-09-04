package com.alap.demo.controller;

import com.alap.demo.dto.ApiResponseDto;
import com.alap.demo.dto.AuthResponseDto;
import com.alap.demo.dto.LoginRequestDto;
import com.alap.demo.dto.RegisterRequestDto;
import com.alap.demo.dto.UserDto;
import com.alap.demo.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponseDto<AuthResponseDto>> register(
            @Valid @RequestBody RegisterRequestDto request
    ) {
        AuthResponseDto response = authService.registerClient(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponseDto.success("Client account registered successfully", response));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponseDto<AuthResponseDto>> login(
            @Valid @RequestBody LoginRequestDto request
    ) {
        AuthResponseDto response = authService.login(request);
        return ResponseEntity.ok(ApiResponseDto.success("Login successful", response));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponseDto<UserDto>> me(
            @RequestHeader(value = "Authorization", required = false) String authHeader
    ) {
        UserDto currentUser = authService.getCurrentUser(authHeader);
        return ResponseEntity.ok(ApiResponseDto.success("User profile retrieved", currentUser));
    }
}
