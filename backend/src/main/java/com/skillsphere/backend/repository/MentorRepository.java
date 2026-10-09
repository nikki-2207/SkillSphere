package com.skillsphere.backend.repository;

import com.skillsphere.backend.entity.Mentor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MentorRepository extends JpaRepository<Mentor, Integer> {

    List<Mentor> findAllByOrderByExperienceYearsDesc();

    Optional<Mentor> findByUserId(Integer userId);

    boolean existsByUserId(Integer userId);
}