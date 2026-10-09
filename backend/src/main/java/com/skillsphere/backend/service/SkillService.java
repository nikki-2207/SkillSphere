package com.skillsphere.backend.service;

import com.skillsphere.backend.entity.Skill;
import com.skillsphere.backend.repository.SkillRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService {

    private final SkillRepository skillRepository;

    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    public Skill getSkillById(Integer id) {

        return skillRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Skill not found"));
    }

    public Skill createSkill(String name, String category) {

        if (name == null || name.trim().isEmpty()) {
            throw new RuntimeException("Skill name is required");
        }

        name = name.trim();

        if (skillRepository.existsByNameIgnoreCase(name)) {
            throw new RuntimeException("Skill already exists");
        }

        Skill skill = new Skill();

        skill.setName(name);
        skill.setCategory(category);

        return skillRepository.save(skill);
    }
}