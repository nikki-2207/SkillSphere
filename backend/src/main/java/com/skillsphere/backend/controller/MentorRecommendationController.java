
package com.skillsphere.backend.controller;

import com.skillsphere.backend.service.MentorRecommendationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai/mentor-recommendations")
public class MentorRecommendationController {

    private final MentorRecommendationService
            mentorRecommendationService;

    public MentorRecommendationController(
            MentorRecommendationService mentorRecommendationService) {
        this.mentorRecommendationService =
                mentorRecommendationService;
    }

    @PostMapping
    public ResponseEntity<?> recommendMentors(
            @RequestBody Map<String, String> request) {

        try {
            String careerGoal = request.get("careerGoal");
            String requiredSkills = request.get("requiredSkills");

            List<Map<String, Object>> recommendations =
                    mentorRecommendationService.recommendMentors(
                            careerGoal, requiredSkills);

            return ResponseEntity.ok(
                    Map.of(
                            "careerGoal", careerGoal,
                            "recommendations", recommendations,
                            "totalRecommendations",
                            recommendations.size()
                    )
            );

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", e.getMessage()));
        }
    }
}