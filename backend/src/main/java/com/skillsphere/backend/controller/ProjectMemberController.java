package com.skillsphere.backend.controller;

import com.skillsphere.backend.dto.ProjectMemberResponse;
import com.skillsphere.backend.service.ProjectMemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/projects")
public class ProjectMemberController {

    private final ProjectMemberService projectMemberService;

    public ProjectMemberController(
            ProjectMemberService projectMemberService) {

        this.projectMemberService = projectMemberService;
    }

    @GetMapping("/{projectId}/members")
    public ResponseEntity<List<ProjectMemberResponse>> getProjectMembers(
            @PathVariable Integer projectId) {

        return ResponseEntity.ok(
                projectMemberService.getProjectMembers(projectId)
        );
    }

    @PostMapping("/{projectId}/members")
    public ResponseEntity<?> addProjectMember(
            @PathVariable Integer projectId,
            @RequestBody Map<String, Object> data) {

        try {
            Integer userId =
                    ((Number) data.get("userId")).intValue();

            String role =
                    (String) data.get("role");

            ProjectMemberResponse response =
                    projectMemberService.addMember(
                            projectId,
                            userId,
                            role
                    );

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {

            return ResponseEntity.badRequest().body(
                    Map.of("message", e.getMessage())
            );
        }
    }

    @DeleteMapping("/{projectId}/members/{userId}")
    public ResponseEntity<?> removeProjectMember(
            @PathVariable Integer projectId,
            @PathVariable Integer userId) {

        try {

            projectMemberService.removeMember(
                    projectId,
                    userId
            );

            return ResponseEntity.ok(
                    Map.of(
                            "message",
                            "Project member removed successfully"
                    )
            );

        } catch (RuntimeException e) {

            return ResponseEntity.badRequest().body(
                    Map.of("message", e.getMessage())
            );
        }
    }
}