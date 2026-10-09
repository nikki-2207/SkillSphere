package com.skillsphere.backend.controller;

import com.skillsphere.backend.dto.ProjectSkillResponse;
import com.skillsphere.backend.service.ProjectSkillService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/projects")
public class ProjectSkillController {

    private final ProjectSkillService projectSkillService;

    public ProjectSkillController(
            ProjectSkillService projectSkillService) {

        this.projectSkillService = projectSkillService;
    }

    @GetMapping("/{projectId}/skills")
    public ResponseEntity<List<ProjectSkillResponse>> getProjectSkills(
            @PathVariable Integer projectId) {

        return ResponseEntity.ok(
                projectSkillService.getProjectSkills(projectId)
        );
    }

    @PostMapping("/{projectId}/skills")
    public ResponseEntity<?> addProjectSkill(
            @PathVariable Integer projectId,
            @RequestBody Map<String, Object> data) {

        try {
            Integer skillId =
                    ((Number) data.get("skillId")).intValue();

            ProjectSkillResponse response =
                    projectSkillService.addSkill(
                            projectId,
                            skillId
                    );

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {

            return ResponseEntity.badRequest().body(
                    Map.of("message", e.getMessage())
            );
        }
    }

    @DeleteMapping("/{projectId}/skills/{skillId}")
    public ResponseEntity<?> removeProjectSkill(
            @PathVariable Integer projectId,
            @PathVariable Integer skillId) {

        try {

            projectSkillService.removeSkill(
                    projectId,
                    skillId
            );

            return ResponseEntity.ok(
                    Map.of(
                            "message",
                            "Project skill removed successfully"
                    )
            );

        } catch (RuntimeException e) {

            return ResponseEntity.badRequest().body(
                    Map.of("message", e.getMessage())
            );
        }
    }
}