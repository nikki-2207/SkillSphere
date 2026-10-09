package com.skillsphere.backend.service;

import com.skillsphere.backend.entity.Project;
import com.skillsphere.backend.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public Project createProject(
            String title,
            String description,
            Integer createdBy) {

        Project project = new Project();

        project.setTitle(title);
        project.setDescription(description);
        project.setStatus("OPEN");
        project.setCreatedBy(createdBy);
        project.setCreatedAt(LocalDateTime.now());

        return projectRepository.save(project);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAllByOrderByCreatedAtDesc();
    }

    public List<Project> getProjectsByCreator(
            Integer createdBy) {

        return projectRepository
                .findByCreatedByOrderByCreatedAtDesc(createdBy);
    }

    public Project getProjectById(Integer id) {

        return projectRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Project not found"
                        ));
    }
}