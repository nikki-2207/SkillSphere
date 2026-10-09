package com.skillsphere.backend.service;

import com.skillsphere.backend.entity.StudentProfile;
import com.skillsphere.backend.entity.User;
import com.skillsphere.backend.repository.StudentProfileRepository;
import com.skillsphere.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class StudentProfileService {

    private final StudentProfileRepository profileRepository;
    private final UserRepository userRepository;

    public StudentProfileService(
            StudentProfileRepository profileRepository,
            UserRepository userRepository) {

        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
    }

    public StudentProfile getProfile(Integer userId) {

        return profileRepository.findByUserId(userId)
                .orElse(null);
    }

    public StudentProfile createProfile(
            Integer userId,
            String bio,
            String college,
            String department,
            String year,
            String location,
            String githubUrl,
            String linkedinUrl,
            String careerGoal) {

        if (profileRepository.existsByUserId(userId)) {
            throw new RuntimeException("Profile already exists");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        StudentProfile profile = new StudentProfile();

        profile.setUser(user);
        profile.setBio(bio);
        profile.setCollege(college);
        profile.setDepartment(department);
        profile.setYear(year);
        profile.setLocation(location);
        profile.setGithubUrl(githubUrl);
        profile.setLinkedinUrl(linkedinUrl);
        profile.setCareerGoal(careerGoal);

        return profileRepository.save(profile);
    }

    public StudentProfile updateProfile(
            Integer userId,
            String bio,
            String college,
            String department,
            String year,
            String location,
            String githubUrl,
            String linkedinUrl,
            String careerGoal) {

        StudentProfile profile = profileRepository.findByUserId(userId)
                .orElseThrow(() ->
                        new RuntimeException("Profile not found"));

        profile.setBio(bio);
        profile.setCollege(college);
        profile.setDepartment(department);
        profile.setYear(year);
        profile.setLocation(location);
        profile.setGithubUrl(githubUrl);
        profile.setLinkedinUrl(linkedinUrl);
        profile.setCareerGoal(careerGoal);

        return profileRepository.save(profile);
    }
}