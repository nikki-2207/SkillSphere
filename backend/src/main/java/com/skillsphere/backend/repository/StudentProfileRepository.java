package com.skillsphere.backend.repository;

import com.skillsphere.backend.entity.StudentProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentProfileRepository
        extends JpaRepository<StudentProfile, Integer> {

    Optional<StudentProfile> findByUserId(Integer userId);

    boolean existsByUserId(Integer userId);
}