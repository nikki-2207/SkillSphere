package com.skillsphere.backend.repository;

import com.skillsphere.backend.entity.ProjectMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProjectMemberRepository
        extends JpaRepository<ProjectMember, Integer> {

    List<ProjectMember> findByProjectId(Integer projectId);

    boolean existsByProjectIdAndUserId(
            Integer projectId,
            Integer userId
    );

    Optional<ProjectMember> findByProjectIdAndUserId(
            Integer projectId,
            Integer userId
    );

    void deleteByProjectIdAndUserId(
            Integer projectId,
            Integer userId
    );
}