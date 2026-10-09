package com.skillsphere.backend.repository;

import com.skillsphere.backend.entity.MentorRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MentorRequestRepository
        extends JpaRepository<MentorRequest, Integer> {

    List<MentorRequest> findByStudentIdOrderByCreatedAtDesc(
            Integer studentId);

    List<MentorRequest> findByMentorIdOrderByCreatedAtDesc(
            Integer mentorId);

    boolean existsByStudentIdAndMentorIdAndStatus(
            Integer studentId,
            Integer mentorId,
            String status);
}