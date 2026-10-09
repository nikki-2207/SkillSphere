package com.skillsphere.backend.controller;

import com.skillsphere.backend.dto.ProfileResponse;
import com.skillsphere.backend.entity.StudentProfile;
import com.skillsphere.backend.service.StudentProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/profile")
public class StudentProfileController {

    private final StudentProfileService profileService;

    public StudentProfileController(StudentProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getProfile(@PathVariable Integer userId) {

        StudentProfile profile = profileService.getProfile(userId);

        if (profile == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(toResponse(profile));
    }

    @PostMapping("/{userId}")
    public ResponseEntity<?> createProfile(
            @PathVariable Integer userId,
            @RequestBody Map<String, String> data) {

        try {

            StudentProfile profile = profileService.createProfile(
                    userId,
                    data.get("bio"),
                    data.get("college"),
                    data.get("department"),
                    data.get("year"),
                    data.get("location"),
                    data.get("githubUrl"),
                    data.get("linkedinUrl"),
                    data.get("careerGoal")
            );

            return ResponseEntity.ok(toResponse(profile));

        } catch (RuntimeException e) {

            return ResponseEntity.badRequest().body(
                    Map.of("message", e.getMessage())
            );
        }
    }

    @PutMapping("/{userId}")
    public ResponseEntity<?> updateProfile(
            @PathVariable Integer userId,
            @RequestBody Map<String, String> data) {

        try {

            StudentProfile profile = profileService.updateProfile(
                    userId,
                    data.get("bio"),
                    data.get("college"),
                    data.get("department"),
                    data.get("year"),
                    data.get("location"),
                    data.get("githubUrl"),
                    data.get("linkedinUrl"),
                    data.get("careerGoal")
            );

            return ResponseEntity.ok(toResponse(profile));

        } catch (RuntimeException e) {

            return ResponseEntity.badRequest().body(
                    Map.of("message", e.getMessage())
            );
        }
    }

    private ProfileResponse toResponse(StudentProfile profile) {

        ProfileResponse response = new ProfileResponse();

        response.setId(profile.getId());
        response.setUserId(profile.getUser().getId());
        response.setName(profile.getUser().getName());
        response.setEmail(profile.getUser().getEmail());
        response.setRole(profile.getUser().getRole());

        response.setBio(profile.getBio());
        response.setCollege(profile.getCollege());
        response.setDepartment(profile.getDepartment());
        response.setYear(profile.getYear());
        response.setLocation(profile.getLocation());
        response.setGithubUrl(profile.getGithubUrl());
        response.setLinkedinUrl(profile.getLinkedinUrl());
        response.setCareerGoal(profile.getCareerGoal());

        return response;
    }
}