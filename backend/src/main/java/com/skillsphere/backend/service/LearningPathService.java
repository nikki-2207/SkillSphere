
package com.skillsphere.backend.service;

import com.skillsphere.backend.dto.LearningPathResponse;
import com.skillsphere.backend.entity.StudentSkill;
import com.skillsphere.backend.repository.StudentSkillRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class LearningPathService {

    private final StudentSkillRepository studentSkillRepository;

    public LearningPathService(
            StudentSkillRepository studentSkillRepository) {
        this.studentSkillRepository = studentSkillRepository;
    }

    public LearningPathResponse generateLearningPath(
            Integer userId, String careerGoal) {

        if (careerGoal == null || careerGoal.isBlank()) {
            throw new RuntimeException("Career goal is required");
        }

        List<StudentSkill> studentSkills =
                studentSkillRepository.findByUserId(userId);

        List<String> currentSkills = studentSkills.stream()
                .map(skill -> skill.getSkill().getName())
                .toList();

        Set<String> normalizedSkills = currentSkills.stream()
                .map(this::normalize)
                .collect(Collectors.toSet());

        List<String> requiredSkills = getLearningPath(careerGoal);

        List<String> remainingSteps = requiredSkills.stream()
                .filter(skill ->
                        !normalizedSkills.contains(normalize(skill)))
                .toList();

        LearningPathResponse response = new LearningPathResponse();
        response.setCareerGoal(careerGoal);
        response.setCurrentSkills(currentSkills);
        response.setLearningPath(remainingSteps);
        response.setTotalSteps(remainingSteps.size());

        return response;
    }

    private List<String> getLearningPath(String careerGoal) {
        String goal = careerGoal.toLowerCase(Locale.ROOT);

        if (goal.contains("java") && goal.contains("full")) {
            return List.of(
                    "Core Java",
                    "Object-Oriented Programming",
                    "Data Structures and Algorithms",
                    "SQL and Database Design",
                    "Git & GitHub",
                    "Spring Boot",
                    "REST API Development",
                    "HTML and CSS",
                    "JavaScript",
                    "React",
                    "Full-Stack Project Development"
            );
        }

        if (goal.contains("java") || goal.contains("backend")) {
            return List.of(
                    "Core Java",
                    "Object-Oriented Programming",
                    "Data Structures and Algorithms",
                    "SQL and Database Design",
                    "Git & GitHub",
                    "Spring Boot",
                    "REST API Development",
                    "Backend Project Development"
            );
        }

        if (goal.contains("frontend") || goal.contains("front end")) {
            return List.of(
                    "HTML",
                    "CSS",
                    "JavaScript",
                    "Git & GitHub",
                    "React",
                    "Frontend Project Development"
            );
        }

        if (goal.contains("data science")
                || goal.contains("data scientist")) {
            return List.of(
                    "Python",
                    "Statistics and Probability",
                    "SQL",
                    "Data Analysis",
                    "Machine Learning",
                    "Data Science Project"
            );
        }

        if (goal.contains("machine learning") || goal.contains("ai")) {
            return List.of(
                    "Python",
                    "Mathematics for Machine Learning",
                    "Data Structures and Algorithms",
                    "Machine Learning",
                    "Deep Learning",
                    "AI Project Development"
            );
        }

        return List.of(
                "Programming Fundamentals",
                "Data Structures and Algorithms",
                "SQL",
                "Git & GitHub",
                "Build a Beginner Project"
        );
    }

    private String normalize(String skill) {
        if (skill == null) {
            return "";
        }

        return skill.toLowerCase(Locale.ROOT)
                .replaceAll("[^a-z0-9]", "");
    }
}