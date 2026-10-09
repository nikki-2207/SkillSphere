package com.skillsphere.backend.controller;

import com.skillsphere.backend.dto.MentorResponse;
import com.skillsphere.backend.service.MentorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mentors")
public class MentorController {

    private final MentorService mentorService;

    public MentorController(MentorService mentorService) {
        this.mentorService = mentorService;
    }

    @GetMapping
    public ResponseEntity<List<MentorResponse>> getAllMentors() {

        return ResponseEntity.ok(
                mentorService.getAllMentors()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getMentorById(
            @PathVariable Integer id) {

        try {
            return ResponseEntity.ok(
                    mentorService.getMentorById(id)
            );

        } catch (RuntimeException e) {
            return ResponseEntity
                    .notFound()
                    .build();
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getMentorByUserId(
            @PathVariable Integer userId) {

        try {
            return ResponseEntity.ok(
                    mentorService.getMentorByUserId(userId)
            );

        } catch (RuntimeException e) {
            return ResponseEntity
                    .notFound()
                    .build();
        }
    }

    @PostMapping
    public ResponseEntity<?> createMentor(
            @RequestBody Map<String, Object> data) {

        try {
            Integer userId =
                    ((Number) data.get("userId")).intValue();

            String expertise =
                    (String) data.get("expertise");

            Integer experienceYears =
                    data.get("experienceYears") == null
                            ? 0
                            : ((Number) data
                                    .get("experienceYears"))
                                    .intValue();

            String availability =
                    (String) data.get("availability");

            if (expertise == null ||
                    expertise.trim().isEmpty()) {

                return ResponseEntity
                        .badRequest()
                        .body(Map.of(
                                "message",
                                "Expertise is required"
                        ));
            }

            MentorResponse response =
                    mentorService.createMentor(
                            userId,
                            expertise.trim(),
                            experienceYears,
                            availability
                    );

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(Map.of(
                            "message",
                            e.getMessage()
                    ));
        }
    }
}