package com.skillsphere.backend.repository;

import com.skillsphere.backend.entity.StudentSkill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentSkillRepository
        extends JpaRepository<StudentSkill, Integer> {

    List<StudentSkill> findByUserId(Integer userId);

    boolean existsByUserIdAndSkillId(Integer userId, Integer skillId);
}