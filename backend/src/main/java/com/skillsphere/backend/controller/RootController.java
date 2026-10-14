package com.skillsphere.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;

@RestController
public class RootController {

    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> root() {
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "service", "SkillSphere Backend API",
                "message", "SkillSphere Backend is running",
                "apiBase", "/api",
                "timestamp", Instant.now().toString()
        ));
    }
}
