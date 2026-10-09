package com.skillsphere.backend.controller;

import com.skillsphere.backend.dto.StudyGroupResponse;
import com.skillsphere.backend.service.StudyGroupService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/study-groups")
public class StudyGroupController {

    private final StudyGroupService studyGroupService;

    public StudyGroupController(
            StudyGroupService studyGroupService) {
        this.studyGroupService = studyGroupService;
    }

    @GetMapping
    public ResponseEntity<List<StudyGroupResponse>> getAllGroups() {

        return ResponseEntity.ok(
                studyGroupService.getAllGroups()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getGroupById(
            @PathVariable Integer id) {

        try {
            return ResponseEntity.ok(
                    studyGroupService.getGroupById(id)
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .notFound()
                    .build();
        }
    }

    @GetMapping("/creator/{userId}")
    public ResponseEntity<List<StudyGroupResponse>>
    getGroupsByCreator(
            @PathVariable Integer userId) {

        return ResponseEntity.ok(
                studyGroupService
                        .getGroupsByCreator(userId)
        );
    }

    @PostMapping
    public ResponseEntity<?> createGroup(
            @RequestBody Map<String, Object> data) {

        try {

            Integer createdBy =
                    ((Number) data.get("createdBy"))
                            .intValue();

            String name =
                    (String) data.get("name");

            String description =
                    (String) data.get("description");

            StudyGroupResponse response =
                    studyGroupService.createGroup(
                            createdBy,
                            name,
                            description
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