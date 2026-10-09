package com.skillsphere.backend.repository;

import com.skillsphere.backend.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository
        extends JpaRepository<Project, Integer> {

    List<Project> findAllByOrderByCreatedAtDesc();

    List<Project> findByCreatedByOrderByCreatedAtDesc(
            Integer createdBy
    );
}