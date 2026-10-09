package com.skillsphere.backend.controller;

import com.skillsphere.backend.dto.TeamMatchResponse;
import com.skillsphere.backend.service.TeamMatchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai/team-match")
public class TeamMatchController {

    private final TeamMatchService teamMatchService;

    public TeamMatchController(
            TeamMatchService teamMatchService) {

        this.teamMatchService = teamMatchService;
    }

    @PostMapping
    public ResponseEntity<?> findBestMatches(
            @RequestBody Map<String, Object> request) {

        try {

            @SuppressWarnings("unchecked")
            List<String> requiredSkills =
                    (List<String>) request.get("requiredSkills");

            Integer currentUserId = null;

            Object userIdValue =
                    request.get("currentUserId");

            if (userIdValue instanceof Number) {
                currentUserId =
                        ((Number) userIdValue).intValue();
            }

            List<TeamMatchResponse> results =
                    teamMatchService.findBestMatches(
                            requiredSkills,
                            currentUserId
                    );

            return ResponseEntity.ok(results);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(Map.of(
                            "message",
                            e.getMessage()
                    ));
        }
    }
}