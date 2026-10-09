package com.skillsphere.backend.service;

import com.skillsphere.backend.dto.SkillGapResponse;
import com.skillsphere.backend.entity.StudentSkill;
import com.skillsphere.backend.repository.StudentSkillRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class SkillGapService {

    private final StudentSkillRepository studentSkillRepository;

    public SkillGapService(
            StudentSkillRepository studentSkillRepository) {

        this.studentSkillRepository = studentSkillRepository;
    }

    public SkillGapResponse analyzeSkillGap(
            Integer userId,
            String careerGoal) {

        if (careerGoal == null || careerGoal.isBlank()) {
            throw new RuntimeException("Career goal is required");
        }

        List<StudentSkill> studentSkills =
                studentSkillRepository.findByUserId(userId);

        List<String> currentSkills =
                studentSkills.stream()
                        .map(studentSkill ->
                                studentSkill.getSkill().getName())
                        .toList();

        List<String> requiredSkills =
                getRequiredSkills(careerGoal);

        Set<String> normalizedCurrentSkills =
                currentSkills.stream()
                        .map(this::normalizeSkill)
                        .collect(Collectors.toSet());

        /*
         * Find missing skills.
         */
        List<String> missingSkills =
                new ArrayList<>();

        for (String requiredSkill : requiredSkills) {

            if (!normalizedCurrentSkills.contains(
                    normalizeSkill(requiredSkill))) {

                if (requiredSkill.equalsIgnoreCase("REST API")) {
                    missingSkills.add("REST API");
                } else {
                    missingSkills.add(requiredSkill);
                }
            }
        }

        /*
         * Create a completely separate list
         * for recommended skills.
         */
        List<String> recommendedSkills =
                new ArrayList<>(missingSkills);

        /*
         * Calculate matched skills.
         */
        int matchedSkillCount = 0;

        for (String requiredSkill : requiredSkills) {

            if (normalizedCurrentSkills.contains(
                    normalizeSkill(requiredSkill))) {

                matchedSkillCount++;
            }
        }

        int skillCoverage = 0;

        if (!requiredSkills.isEmpty()) {

            skillCoverage =
                    (matchedSkillCount * 100)
                            / requiredSkills.size();
        }

        SkillGapResponse response =
                new SkillGapResponse();

        response.setCareerGoal(careerGoal);
        response.setCurrentSkills(currentSkills);
        response.setMissingSkills(missingSkills);
        response.setRecommendedSkills(recommendedSkills);
        response.setSkillCoverage(skillCoverage);

        return response;
    }

    private List<String> getRequiredSkills(
            String careerGoal) {

        String goal =
                careerGoal.toLowerCase(Locale.ROOT);

        /*
         * Java Full Stack Developer
         */
        if (goal.contains("java")
                && goal.contains("full")) {

            return List.of(
                    "Java",
                    "SQL",
                    "Spring Boot",
                    "REST API",
                    "HTML",
                    "CSS",
                    "JavaScript",
                    "React",
                    "Git & GitHub"
            );
        }

        /*
         * Java / Backend Developer
         */
        if (goal.contains("java")
                || goal.contains("backend")) {

            return List.of(
                    "Java",
                    "SQL",
                    "Spring Boot",
                    "REST API",
                    "Git & GitHub"
            );
        }

        /*
         * Frontend Developer
         */
        if (goal.contains("frontend")
                || goal.contains("front end")) {

            return List.of(
                    "HTML",
                    "CSS",
                    "JavaScript",
                    "React",
                    "Git & GitHub"
            );
        }

        /*
         * Data Scientist
         */
        if (goal.contains("data scientist")
                || goal.contains("data science")) {

            return List.of(
                    "Python",
                    "SQL",
                    "Machine Learning",
                    "Data Structures",
                    "Git & GitHub"
            );
        }

        /*
         * AI / Machine Learning
         */
        if (goal.contains("machine learning")
                || goal.contains("ai")) {

            return List.of(
                    "Python",
                    "Data Structures",
                    "Algorithms",
                    "Machine Learning",
                    "Deep Learning"
            );
        }

        /*
         * Default career goal
         */
        return List.of(
                "Communication",
                "Git & GitHub",
                "Data Structures",
                "Algorithms"
        );
    }

    private String normalizeSkill(String skill) {

        if (skill == null) {
            return "";
        }

        return skill
                .toLowerCase(Locale.ROOT)
                .replaceAll("[^a-z0-9]", "");
    }
}