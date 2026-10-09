package com.skillsphere.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(
    name = "project_skills",
    uniqueConstraints = {
        @UniqueConstraint(
            columnNames = {"project_id", "skill_id"}
        )
    }
)
public class ProjectSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "project_id", nullable = false)
    private Integer projectId;

    @Column(name = "skill_id", nullable = false)
    private Integer skillId;

    public ProjectSkill() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getProjectId() {
        return projectId;
    }

    public void setProjectId(Integer projectId) {
        this.projectId = projectId;
    }

    public Integer getSkillId() {
        return skillId;
    }

    public void setSkillId(Integer skillId) {
        this.skillId = skillId;
    }
}