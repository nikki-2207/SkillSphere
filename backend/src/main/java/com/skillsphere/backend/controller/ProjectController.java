package com.skillsphere.backend.controller;

import com.skillsphere.backend.entity.Project;
import com.skillsphere.backend.service.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping
    public ResponseEntity<?> createProject(
            @RequestBody Map<String, Object> data) {

        try {
            String title = (String) data.get("title");
            String description = (String) data.get("description");

            Integer createdBy =
                    ((Number) data.get("createdBy")).intValue();

            if (title == null || title.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(
                        Map.of("message", "Project title is required")
                );
            }

            Project project =
                    projectService.createProject(
                            title.trim(),
                            description,
                            createdBy
                    );

            return ResponseEntity.ok(project);

        } catch (RuntimeException e) {

            return ResponseEntity.badRequest().body(
                    Map.of("message", e.getMessage())
            );
        }
    }

    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {

        return ResponseEntity.ok(
                projectService.getAllProjects()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProjectById(
            @PathVariable Integer id) {

        try {

            return ResponseEntity.ok(
                    projectService.getProjectById(id)
            );

        } catch (RuntimeException e) {

            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/creator/{userId}")
    public ResponseEntity<List<Project>> getProjectsByCreator(
            @PathVariable Integer userId) {

        return ResponseEntity.ok(
                projectService.getProjectsByCreator(userId)
        );
    }
}