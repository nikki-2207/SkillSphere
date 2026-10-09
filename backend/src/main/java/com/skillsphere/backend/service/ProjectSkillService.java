package com.skillsphere.backend.service;

import com.skillsphere.backend.dto.ProjectSkillResponse;
import com.skillsphere.backend.entity.ProjectSkill;
import com.skillsphere.backend.entity.Skill;
import com.skillsphere.backend.repository.ProjectSkillRepository;
import com.skillsphere.backend.repository.SkillRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProjectSkillService {

    private final ProjectSkillRepository projectSkillRepository;
    private final SkillRepository skillRepository;

    public ProjectSkillService(
            ProjectSkillRepository projectSkillRepository,
            SkillRepository skillRepository) {

        this.projectSkillRepository = projectSkillRepository;
        this.skillRepository = skillRepository;
    }

    public List<ProjectSkillResponse> getProjectSkills(
            Integer projectId) {

        return projectSkillRepository
                .findByProjectId(projectId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public ProjectSkillResponse addSkill(
            Integer projectId,
            Integer skillId) {

        if (projectSkillRepository
                .existsByProjectIdAndSkillId(projectId, skillId)) {

            throw new RuntimeException(
                    "Project already has this skill"
            );
        }

        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Skill not found"
                        ));

        ProjectSkill projectSkill = new ProjectSkill();

        projectSkill.setProjectId(projectId);
        projectSkill.setSkillId(skillId);

        ProjectSkill saved =
                projectSkillRepository.save(projectSkill);

        return toResponse(saved);
    }

    @Transactional
    public void removeSkill(
            Integer projectId,
            Integer skillId) {

        if (!projectSkillRepository
                .existsByProjectIdAndSkillId(projectId, skillId)) {

            throw new RuntimeException(
                    "Project does not have this skill"
            );
        }

        projectSkillRepository.deleteByProjectIdAndSkillId(
                projectId,
                skillId
        );
    }

    private ProjectSkillResponse toResponse(
            ProjectSkill projectSkill) {

        ProjectSkillResponse response =
                new ProjectSkillResponse();

        response.setId(projectSkill.getId());
        response.setProjectId(projectSkill.getProjectId());
        response.setSkillId(projectSkill.getSkillId());

        Skill skill = skillRepository
                .findById(projectSkill.getSkillId())
                .orElse(null);

        if (skill != null) {
            response.setSkillName(skill.getName());
            response.setCategory(skill.getCategory());
        }

        return response;
    }
}