package com.alap.demo.service;

import com.alap.demo.dto.AuthResponseDto;
import com.alap.demo.dto.LoginRequestDto;
import com.alap.demo.dto.RegisterRequestDto;
import com.alap.demo.dto.UserDto;
import com.alap.demo.model.Role;
import com.alap.demo.model.User;
import com.alap.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final Map<String, User> fallbackUserMap = new ConcurrentHashMap<>();

    @Autowired
    public AuthService(UserRepository userRepository, JwtService jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    public AuthResponseDto registerClient(RegisterRequestDto dto) {
        String emailKey = dto.email().toLowerCase();
        
        if (userRepository != null) {
            if (userRepository.existsByEmailIgnoreCase(emailKey)) {
                throw new IllegalArgumentException("User with this email already exists.");
            }
        } else if (fallbackUserMap.containsKey(emailKey)) {
            throw new IllegalArgumentException("User with this email already exists.");
        }

        // Strictly enforce Role.CLIENT for self-registration
        User newUser = new User(
                "usr-" + UUID.randomUUID().toString().substring(0, 8),
                dto.name(),
                dto.email(),
                hashPassword(dto.password()),
                dto.company() != null ? dto.company() : "",
                dto.phone() != null ? dto.phone() : "",
                Role.CLIENT,
                LocalDateTime.now()
        );

        if (userRepository != null) {
            try {
                userRepository.save(newUser);
            } catch (Exception e) {
                fallbackUserMap.put(emailKey, newUser);
            }
        } else {
            fallbackUserMap.put(emailKey, newUser);
        }

        String token = jwtService.generateToken(newUser);

        return new AuthResponseDto(token, toUserDto(newUser));
    }

    public AuthResponseDto login(LoginRequestDto dto) {
        String emailKey = dto.email().toLowerCase();
        User user = findUserByEmail(emailKey);

        if (user == null || !user.getPassword().equals(hashPassword(dto.password()))) {
            throw new IllegalArgumentException("Invalid email address or password.");
        }

        String token = jwtService.generateToken(user);

        return new AuthResponseDto(token, toUserDto(user));
    }

    public UserDto getCurrentUser(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Invalid or missing Authorization header.");
        }
        String token = authHeader.substring(7);

        if (!jwtService.validateToken(token)) {
            throw new IllegalArgumentException("Invalid or expired session token.");
        }

        String userEmail = jwtService.extractEmail(token);
        User user = findUserByEmail(userEmail);
        if (user == null) {
            throw new IllegalArgumentException("User profile not found.");
        }

        return toUserDto(user);
    }

    private User findUserByEmail(String emailKey) {
        if (userRepository != null) {
            try {
                Optional<User> dbUser = userRepository.findByEmailIgnoreCase(emailKey);
                if (dbUser.isPresent()) {
                    return dbUser.get();
                }
            } catch (Exception ignored) {
                // Fallback to in-memory store if DB is offline during development
            }
        }
        return fallbackUserMap.get(emailKey.toLowerCase());
    }

    private UserDto toUserDto(User user) {
        return new UserDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getCompany(),
                user.getPhone(),
                user.getRole(),
                user.getCreatedAt()
        );
    }

    private String hashPassword(String rawPassword) {
        // Standard SHA-256 / Hash simulation for initial RBAC model
        return "hashed_" + rawPassword;
    }
}
