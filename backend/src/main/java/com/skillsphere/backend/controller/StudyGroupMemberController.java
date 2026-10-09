package com.skillsphere.backend.controller;

import com.skillsphere.backend.dto.StudyGroupMemberResponse;
import com.skillsphere.backend.service.StudyGroupMemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/study-groups")
public class StudyGroupMemberController {

    private final StudyGroupMemberService memberService;

    public StudyGroupMemberController(
            StudyGroupMemberService memberService) {

        this.memberService = memberService;
    }

    @GetMapping("/{groupId}/members")
    public ResponseEntity<?> getMembers(
            @PathVariable Integer groupId) {

        try {

            return ResponseEntity.ok(
                    memberService.getMembers(groupId)
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .notFound()
                    .build();
        }
    }

    @PostMapping("/{groupId}/members")
    public ResponseEntity<?> joinGroup(
            @PathVariable Integer groupId,
            @RequestBody Map<String, Object> data) {

        try {

            Integer userId =
                    ((Number) data.get("userId"))
                            .intValue();

            StudyGroupMemberResponse response =
                    memberService.joinGroup(
                            groupId,
                            userId
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

    @DeleteMapping("/{groupId}/members/{userId}")
    public ResponseEntity<?> leaveGroup(
            @PathVariable Integer groupId,
            @PathVariable Integer userId) {

        try {

            memberService.leaveGroup(
                    groupId,
                    userId
            );

            return ResponseEntity.ok(
                    Map.of(
                            "message",
                            "User left the study group successfully"
                    )
            );

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