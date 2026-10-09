package com.skillsphere.backend.repository;

import com.skillsphere.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StudentSearchRepository
        extends JpaRepository<User, Integer> {

    @Query("""
            SELECT DISTINCT u
            FROM User u
            LEFT JOIN StudentProfile p ON p.user.id = u.id
            LEFT JOIN StudentSkill ss ON ss.user.id = u.id
            LEFT JOIN Skill s ON s.id = ss.skill.id
            WHERE (:skill IS NULL OR :skill = ''
                   OR LOWER(s.name) = LOWER(:skill))
              AND (:department IS NULL OR :department = ''
                   OR LOWER(p.department) = LOWER(:department))
              AND (:year IS NULL OR :year = ''
                   OR LOWER(p.year) = LOWER(:year))
            ORDER BY u.name
            """)
    List<User> searchStudents(
            @Param("skill") String skill,
            @Param("department") String department,
            @Param("year") String year);
}