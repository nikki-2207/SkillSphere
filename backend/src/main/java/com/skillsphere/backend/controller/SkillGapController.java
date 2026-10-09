package com.skillsphere.backend.controller;

import com.skillsphere.backend.dto.SkillGapResponse;
import com.skillsphere.backend.service.SkillGapService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai/skill-gap")
public class SkillGapController {

    private final SkillGapService skillGapService;

    public SkillGapController(
            SkillGapService skillGapService) {

        this.skillGapService = skillGapService;
    }

    @PostMapping
    public ResponseEntity<?> analyzeSkillGap(
            @RequestBody Map<String, Object> request) {

        try {

            Object userIdValue =
                    request.get("userId");

            if (!(userIdValue instanceof Number)) {
                throw new RuntimeException(
                        "userId is required");
            }

            Integer userId =
                    ((Number) userIdValue).intValue();

            String careerGoal =
                    (String) request.get("careerGoal");

            SkillGapResponse response =
                    skillGapService.analyzeSkillGap(
                            userId,
                            careerGoal
                    );

            return ResponseEntity.ok(response);

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