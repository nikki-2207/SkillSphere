package com.skillsphere.backend.controller;

import com.skillsphere.backend.dto.MentorRequestResponse;
import com.skillsphere.backend.service.MentorRequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mentor-requests")
public class MentorRequestController {

    private final MentorRequestService mentorRequestService;

    public MentorRequestController(
            MentorRequestService mentorRequestService) {
        this.mentorRequestService = mentorRequestService;
    }

    @PostMapping
    public ResponseEntity<?> createRequest(
            @RequestBody Map<String, Object> data) {

        try {
            Integer studentId =
                    ((Number) data.get("studentId")).intValue();

            Integer mentorId =
                    ((Number) data.get("mentorId")).intValue();

            String message =
                    (String) data.get("message");

            MentorRequestResponse response =
                    mentorRequestService.createRequest(
                            studentId,
                            mentorId,
                            message
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

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<MentorRequestResponse>>
    getRequestsByStudent(
            @PathVariable Integer studentId) {

        return ResponseEntity.ok(
                mentorRequestService
                        .getRequestsByStudent(studentId)
        );
    }

    @GetMapping("/mentor/{mentorId}")
    public ResponseEntity<List<MentorRequestResponse>>
    getRequestsByMentor(
            @PathVariable Integer mentorId) {

        return ResponseEntity.ok(
                mentorRequestService
                        .getRequestsByMentor(mentorId)
        );
    }

    @PutMapping("/{requestId}/status")
    public ResponseEntity<?> updateStatus(
            @PathVariable Integer requestId,
            @RequestBody Map<String, String> data) {

        try {
            String status = data.get("status");

            MentorRequestResponse response =
                    mentorRequestService.updateStatus(
                            requestId,
                            status
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