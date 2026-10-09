package com.skillsphere.backend.service;

import com.skillsphere.backend.dto.StudentSearchResponse;
import com.skillsphere.backend.entity.StudentProfile;
import com.skillsphere.backend.entity.StudentSkill;
import com.skillsphere.backend.entity.User;
import com.skillsphere.backend.repository.StudentProfileRepository;
import com.skillsphere.backend.repository.StudentSearchRepository;
import com.skillsphere.backend.repository.StudentSkillRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentSearchService {

    private final StudentSearchRepository studentSearchRepository;
    private final StudentProfileRepository profileRepository;
    private final StudentSkillRepository studentSkillRepository;

    public StudentSearchService(
            StudentSearchRepository studentSearchRepository,
            StudentProfileRepository profileRepository,
            StudentSkillRepository studentSkillRepository) {

        this.studentSearchRepository = studentSearchRepository;
        this.profileRepository = profileRepository;
        this.studentSkillRepository = studentSkillRepository;
    }

    public List<StudentSearchResponse> getStudents(
            String skill,
            String department,
            String year) {

        String cleanSkill =
                skill == null ? null : skill.trim();

        String cleanDepartment =
                department == null ? null : department.trim();

        String cleanYear =
                year == null ? null : year.trim();

        List<User> students =
                studentSearchRepository.searchStudents(
                        cleanSkill,
                        cleanDepartment,
                        cleanYear
                );

        return students.stream()
                .map(this::toResponse)
                .toList();
    }

    private StudentSearchResponse toResponse(User user) {

        StudentSearchResponse response =
                new StudentSearchResponse();

        response.setUserId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());

        StudentProfile profile =
                profileRepository.findByUserId(user.getId())
                        .orElse(null);

        if (profile != null) {

            response.setCollege(profile.getCollege());
            response.setDepartment(profile.getDepartment());
            response.setYear(profile.getYear());
            response.setLocation(profile.getLocation());
            response.setCareerGoal(profile.getCareerGoal());
        }

        List<String> skills =
                studentSkillRepository
                        .findByUserId(user.getId())
                        .stream()
                        .map(StudentSkill::getSkill)
                        .map(skillEntity ->
                                skillEntity.getName())
                        .toList();

        response.setSkills(skills);

        return response;
    }
}