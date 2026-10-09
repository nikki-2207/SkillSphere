package com.skillsphere.backend.service;

import com.skillsphere.backend.entity.Skill;
import com.skillsphere.backend.entity.StudentSkill;
import com.skillsphere.backend.entity.User;
import com.skillsphere.backend.repository.SkillRepository;
import com.skillsphere.backend.repository.StudentSkillRepository;
import com.skillsphere.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentSkillService {

    private final StudentSkillRepository studentSkillRepository;
    private final UserRepository userRepository;
    private final SkillRepository skillRepository;

    public StudentSkillService(
            StudentSkillRepository studentSkillRepository,
            UserRepository userRepository,
            SkillRepository skillRepository) {

        this.studentSkillRepository = studentSkillRepository;
        this.userRepository = userRepository;
        this.skillRepository = skillRepository;
    }

    public List<StudentSkill> getStudentSkills(Integer userId) {

        return studentSkillRepository.findByUserId(userId);
    }

    public StudentSkill addSkill(
            Integer userId,
            Integer skillId,
            String proficiency) {

        if (studentSkillRepository
                .existsByUserIdAndSkillId(userId, skillId)) {

            throw new RuntimeException(
                    "Student already has this skill");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() ->
                        new RuntimeException("Skill not found"));

        if (proficiency == null ||
                proficiency.trim().isEmpty()) {

            proficiency = "Beginner";
        }

        StudentSkill studentSkill = new StudentSkill();

        studentSkill.setUser(user);
        studentSkill.setSkill(skill);
        studentSkill.setProficiency(proficiency);

        return studentSkillRepository.save(studentSkill);
    }

    public void removeSkill(
            Integer userId,
            Integer skillId) {

        List<StudentSkill> studentSkills =
                studentSkillRepository.findByUserId(userId);

        StudentSkill skillToRemove = studentSkills.stream()
                .filter(studentSkill ->
                        studentSkill.getSkill()
                                .getId()
                                .equals(skillId))
                .findFirst()
                .orElseThrow(() ->
                        new RuntimeException(
                                "Student does not have this skill"));

        studentSkillRepository.delete(skillToRemove);
    }
}