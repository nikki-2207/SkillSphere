package com.skillsphere.backend.service;

import com.skillsphere.backend.dto.MentorRequestResponse;
import com.skillsphere.backend.entity.Mentor;
import com.skillsphere.backend.entity.MentorRequest;
import com.skillsphere.backend.entity.User;
import com.skillsphere.backend.repository.MentorRepository;
import com.skillsphere.backend.repository.MentorRequestRepository;
import com.skillsphere.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MentorRequestService {

    private final MentorRequestRepository mentorRequestRepository;
    private final MentorRepository mentorRepository;
    private final UserRepository userRepository;

    public MentorRequestService(
            MentorRequestRepository mentorRequestRepository,
            MentorRepository mentorRepository,
            UserRepository userRepository) {

        this.mentorRequestRepository = mentorRequestRepository;
        this.mentorRepository = mentorRepository;
        this.userRepository = userRepository;
    }

    public MentorRequestResponse createRequest(
            Integer studentId,
            Integer mentorId,
            String message) {

        if (!userRepository.existsById(studentId)) {
            throw new RuntimeException("Student not found");
        }

        if (!mentorRepository.existsById(mentorId)) {
            throw new RuntimeException("Mentor not found");
        }

        if (mentorRequestRepository
                .existsByStudentIdAndMentorIdAndStatus(
                        studentId,
                        mentorId,
                        "PENDING")) {

            throw new RuntimeException(
                    "A pending request already exists");
        }

        MentorRequest request = new MentorRequest();

        request.setStudentId(studentId);
        request.setMentorId(mentorId);
        request.setMessage(message);
        request.setStatus("PENDING");
        request.setCreatedAt(LocalDateTime.now());

        MentorRequest saved =
                mentorRequestRepository.save(request);

        return toResponse(saved);
    }

    public List<MentorRequestResponse> getRequestsByStudent(
            Integer studentId) {

        return mentorRequestRepository
                .findByStudentIdOrderByCreatedAtDesc(studentId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public List<MentorRequestResponse> getRequestsByMentor(
            Integer mentorId) {

        return mentorRequestRepository
                .findByMentorIdOrderByCreatedAtDesc(mentorId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public MentorRequestResponse updateStatus(
            Integer requestId,
            String status) {

        MentorRequest request =
                mentorRequestRepository.findById(requestId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Mentor request not found"));

        if (!status.equals("ACCEPTED")
                && !status.equals("REJECTED")) {

            throw new RuntimeException(
                    "Status must be ACCEPTED or REJECTED");
        }

        request.setStatus(status);

        MentorRequest updated =
                mentorRequestRepository.save(request);

        return toResponse(updated);
    }

    private MentorRequestResponse toResponse(
            MentorRequest request) {

        MentorRequestResponse response =
                new MentorRequestResponse();

        response.setId(request.getId());
        response.setStudentId(request.getStudentId());
        response.setMentorId(request.getMentorId());
        response.setMessage(request.getMessage());
        response.setStatus(request.getStatus());
        response.setCreatedAt(request.getCreatedAt());

        User student =
                userRepository
                        .findById(request.getStudentId())
                        .orElse(null);

        if (student != null) {
            response.setStudentName(student.getName());
            response.setStudentEmail(student.getEmail());
        }

        Mentor mentor =
                mentorRepository
                        .findById(request.getMentorId())
                        .orElse(null);

        if (mentor != null) {

            User mentorUser =
                    userRepository
                            .findById(mentor.getUserId())
                            .orElse(null);

            if (mentorUser != null) {
                response.setMentorName(mentorUser.getName());
                response.setMentorEmail(mentorUser.getEmail());
            }
        }

        return response;
    }
}