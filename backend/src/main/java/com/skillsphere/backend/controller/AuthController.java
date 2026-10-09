package com.skillsphere.backend.controller;

import com.skillsphere.backend.dto.LoginRequest;
import com.skillsphere.backend.dto.RegisterRequest;
import com.skillsphere.backend.entity.User;
import com.skillsphere.backend.security.JwtService;
import com.skillsphere.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;

    public AuthController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody(required = false) RegisterRequest body,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String password) {

        String regName = body != null && body.getName() != null ? body.getName() : name;
        String regEmail = body != null && body.getEmail() != null ? body.getEmail() : email;
        String regPassword = body != null && body.getPassword() != null ? body.getPassword() : password;

        if (regName == null || regName.trim().isEmpty() ||
            regEmail == null || regEmail.trim().isEmpty() ||
            regPassword == null || regPassword.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", "Name, email, and password are required")
            );
        }

        try {
            User user = userService.registerUser(regName.trim(), regEmail.trim(), regPassword);

            return ResponseEntity.ok(Map.of(
                    "message", "Registration successful",
                    "id", user.getId(),
                    "name", user.getName(),
                    "email", user.getEmail(),
                    "role", user.getRole()
            ));

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", e.getMessage())
            );
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        try {
            User user = userService.loginUser(
                    request.getEmail(),
                    request.getPassword()
            );

            String token = jwtService.generateToken(user.getEmail());

            return ResponseEntity.ok(Map.of(
                    "message", "Login successful",
                    "token", token,
                    "id", user.getId(),
                    "name", user.getName(),
                    "email", user.getEmail(),
                    "role", user.getRole()
            ));

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", e.getMessage())
            );
        }
    }
}