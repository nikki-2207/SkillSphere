
package com.skillsphere.backend.service;

import com.skillsphere.backend.entity.Mentor;
import com.skillsphere.backend.repository.MentorRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@Service
public class MentorRecommendationService {

    private final MentorRepository mentorRepository;

    public MentorRecommendationService(
            MentorRepository mentorRepository) {
        this.mentorRepository = mentorRepository;
    }

    public List<Map<String, Object>> recommendMentors(
            String careerGoal, String requiredSkills) {

        if (careerGoal == null || careerGoal.isBlank()) {
            throw new IllegalArgumentException(
                    "Career goal is required");
        }

        String goal = careerGoal.toLowerCase(Locale.ROOT);

        List<String> keywords = new ArrayList<>();
        keywords.add(goal);

        if (requiredSkills != null && !requiredSkills.isBlank()) {
            for (String skill : requiredSkills.split(",")) {
                if (!skill.isBlank()) {
                    keywords.add(skill.trim().toLowerCase(Locale.ROOT));
                }
            }
        }

        List<Map<String, Object>> recommendations =
                new ArrayList<>();

        for (Mentor mentor :
                mentorRepository.findAllByOrderByExperienceYearsDesc()) {

            String expertise = mentor.getExpertise() == null
                    ? ""
                    : mentor.getExpertise().toLowerCase(Locale.ROOT);

            int matches = 0;

            for (String keyword : keywords) {
                if (expertise.contains(keyword)) {
                    matches++;
                }
            }

            if (matches > 0) {
                int score = Math.min(
                        100,
                        (matches * 100) / keywords.size());

                Map<String, Object> result =
                        new LinkedHashMap<>();

                result.put("mentorId", mentor.getId());
                result.put("userId", mentor.getUserId());
                result.put("expertise", mentor.getExpertise());
                result.put("experienceYears",
                        mentor.getExperienceYears());
                result.put("availability", mentor.getAvailability());
                result.put("matchScore", score);

                recommendations.add(result);
            }
        }

        recommendations.sort(
                Comparator
                        .<Map<String, Object>>comparingInt(
                                mentor -> (Integer) mentor.get("matchScore"))
                        .reversed()
                        .thenComparing(
                                Comparator.comparingInt(
                                        (Map<String, Object> mentor) ->
                                                mentor.get("experienceYears") == null
                                                        ? 0
                                                        : (Integer) mentor.get(
                                                                "experienceYears"))
                                        .reversed()));

        return recommendations;
    }
}