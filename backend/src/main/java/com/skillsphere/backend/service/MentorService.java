package com.skillsphere.backend.service;

import com.skillsphere.backend.dto.MentorResponse;
import com.skillsphere.backend.entity.Mentor;
import com.skillsphere.backend.entity.User;
import com.skillsphere.backend.repository.MentorRepository;
import com.skillsphere.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MentorService {

    private final MentorRepository mentorRepository;
    private final UserRepository userRepository;

    public MentorService(
            MentorRepository mentorRepository,
            UserRepository userRepository) {

        this.mentorRepository = mentorRepository;
        this.userRepository = userRepository;
    }

    public List<MentorResponse> getAllMentors() {

        return mentorRepository
                .findAllByOrderByExperienceYearsDesc()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public MentorResponse getMentorById(Integer id) {

        Mentor mentor = mentorRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Mentor not found"));

        return toResponse(mentor);
    }

    public MentorResponse getMentorByUserId(Integer userId) {

        Mentor mentor = mentorRepository.findByUserId(userId)
                .orElseThrow(() ->
                        new RuntimeException("Mentor not found"));

        return toResponse(mentor);
    }

    public MentorResponse createMentor(
            Integer userId,
            String expertise,
            Integer experienceYears,
            String availability) {

        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("Student not found");
        }

        if (mentorRepository.existsByUserId(userId)) {
            throw new RuntimeException(
                    "Student is already registered as a mentor");
        }

        Mentor mentor = new Mentor();

        mentor.setUserId(userId);
        mentor.setExpertise(expertise);
        mentor.setExperienceYears(experienceYears);
        mentor.setAvailability(availability);

        Mentor savedMentor = mentorRepository.save(mentor);

        return toResponse(savedMentor);
    }

    private MentorResponse toResponse(Mentor mentor) {

        MentorResponse response = new MentorResponse();

        response.setId(mentor.getId());
        response.setUserId(mentor.getUserId());
        response.setExpertise(mentor.getExpertise());
        response.setExperienceYears(mentor.getExperienceYears());
        response.setAvailability(mentor.getAvailability());

        User user = userRepository
                .findById(mentor.getUserId())
                .orElse(null);

        if (user != null) {
            response.setUserName(user.getName());
            response.setUserEmail(user.getEmail());
        }

        return response;
    }
}