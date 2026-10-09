package com.skillsphere.backend.repository;

import com.skillsphere.backend.entity.StudyGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudyGroupRepository
        extends JpaRepository<StudyGroup, Integer> {

    List<StudyGroup> findAllByOrderByCreatedAtDesc();

    List<StudyGroup> findByCreatedByOrderByCreatedAtDesc(
            Integer createdBy
    );
}