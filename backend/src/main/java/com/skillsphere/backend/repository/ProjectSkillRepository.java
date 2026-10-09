package com.skillsphere.backend.repository;

import com.skillsphere.backend.entity.ProjectSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjectSkillRepository
        extends JpaRepository<ProjectSkill, Integer> {

    List<ProjectSkill> findByProjectId(Integer projectId);

    boolean existsByProjectIdAndSkillId(
            Integer projectId,
            Integer skillId
    );

    @Modifying
    @Query("""
            DELETE FROM ProjectSkill ps
            WHERE ps.projectId = :projectId
              AND ps.skillId = :skillId
            """)
    void deleteByProjectIdAndSkillId(
            @Param("projectId") Integer projectId,
            @Param("skillId") Integer skillId
    );
}