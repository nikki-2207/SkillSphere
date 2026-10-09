package com.skillsphere.backend.service;

import com.skillsphere.backend.dto.TeamMatchResponse;
import com.skillsphere.backend.entity.StudentSkill;
import com.skillsphere.backend.entity.User;
import com.skillsphere.backend.entity.StudentProfile;
import com.skillsphere.backend.repository.StudentProfileRepository;
import com.skillsphere.backend.repository.StudentSkillRepository;
import com.skillsphere.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;

@Service
public class TeamMatchService {

    private final UserRepository userRepository;
    private final StudentSkillRepository studentSkillRepository;
    private final StudentProfileRepository profileRepository;

    public TeamMatchService(
            UserRepository userRepository,
            StudentSkillRepository studentSkillRepository,
            StudentProfileRepository profileRepository) {

        this.userRepository = userRepository;
        this.studentSkillRepository = studentSkillRepository;
        this.profileRepository = profileRepository;
    }

    public List<TeamMatchResponse> findBestMatches(
            List<String> requiredSkills,
            Integer currentUserId) {

        if (requiredSkills == null || requiredSkills.isEmpty()) {
            throw new RuntimeException(
                    "At least one required skill is needed");
        }

        Set<String> required =
                requiredSkills.stream()
                        .filter(skill -> skill != null
                                && !skill.isBlank())
                        .map(skill -> skill.trim().toLowerCase())
                        .collect(java.util.stream.Collectors.toSet());

        if (required.isEmpty()) {
            throw new RuntimeException(
                    "At least one valid required skill is needed");
        }

        List<User> users = userRepository.findAll();

        List<TeamMatchResponse> results =
                new ArrayList<>();

        for (User user : users) {

            // Do not recommend the current user as their own teammate.
            if (currentUserId != null
                    && user.getId().equals(currentUserId)) {
                continue;
            }

            List<StudentSkill> studentSkills =
                    studentSkillRepository
                            .findByUserId(user.getId());

            List<String> studentSkillNames =
                    studentSkills.stream()
                            .map(skill -> skill.getSkill().getName())
                            .toList();

            Set<String> studentSkillSet =
                    studentSkillNames.stream()
                            .map(skill ->
                                    skill.toLowerCase(Locale.ROOT))
                            .collect(java.util.stream.Collectors.toSet());

            List<String> matchedSkills =
                    new ArrayList<>();

            for (String requiredSkill : required) {

                if (studentSkillSet.contains(requiredSkill)) {

                    studentSkills.stream()
                            .filter(skill ->
                                    skill.getSkill()
                                            .getName()
                                            .equalsIgnoreCase(
                                                    requiredSkill))
                            .findFirst()
                            .ifPresent(skill ->
                                    matchedSkills.add(
                                            skill.getSkill()
                                                    .getName()));
                }
            }

            List<String> missingSkills =
                    required.stream()
                            .filter(skill ->
                                    !studentSkillSet.contains(skill))
                            .map(this::capitalizeSkill)
                            .toList();

            int matchScore =
                    (matchedSkills.size() * 100)
                            / required.size();

            TeamMatchResponse response =
                    new TeamMatchResponse();

            response.setUserId(user.getId());
            response.setName(user.getName());
            response.setEmail(user.getEmail());
            response.setStudentSkills(studentSkillNames);
            response.setMatchedSkills(matchedSkills);
            response.setMissingSkills(missingSkills);
            response.setMatchScore(matchScore);
            StudentProfile profile = profileRepository.findByUserId(user.getId()).orElse(null);
            if (profile != null) {
                response.setDepartment(profile.getDepartment());
                response.setYear(profile.getYear());
                response.setCollege(profile.getCollege());
                response.setLocation(profile.getLocation());
                response.setBio(profile.getBio());
            }

            results.add(response);
        }

        results.sort(
                Comparator.comparing(
                        TeamMatchResponse::getMatchScore)
                        .reversed()
        );

        return results;
    }

    private String capitalizeSkill(String skill) {

        if (skill == null || skill.isBlank()) {
            return skill;
        }

        return skill.substring(0, 1).toUpperCase()
                + skill.substring(1);
    }
}