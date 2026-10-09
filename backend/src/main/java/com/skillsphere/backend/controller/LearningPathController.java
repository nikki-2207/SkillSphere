
package com.skillsphere.backend.controller;

import com.skillsphere.backend.dto.LearningPathResponse;
import com.skillsphere.backend.service.LearningPathService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai/learning-path")
public class LearningPathController {

    private final LearningPathService learningPathService;

    public LearningPathController(
            LearningPathService learningPathService) {
        this.learningPathService = learningPathService;
    }

    @PostMapping
    public ResponseEntity<?> generateLearningPath(
            @RequestBody Map<String, Object> request) {

        try {
            Object userIdValue = request.get("userId");

            if (!(userIdValue instanceof Number)) {
                throw new RuntimeException("userId is required");
            }

            Integer userId =
                    ((Number) userIdValue).intValue();

            String careerGoal =
                    (String) request.get("careerGoal");

            LearningPathResponse response =
                    learningPathService.generateLearningPath(
                            userId, careerGoal);

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", e.getMessage()));
        }
    }
}