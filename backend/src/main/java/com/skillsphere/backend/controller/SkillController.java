package com.skillsphere.backend.controller;

import com.skillsphere.backend.entity.Skill;
import com.skillsphere.backend.service.SkillService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @GetMapping
    public ResponseEntity<List<Skill>> getAllSkills() {

        return ResponseEntity.ok(
                skillService.getAllSkills()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSkillById(
            @PathVariable Integer id) {

        try {

            return ResponseEntity.ok(
                    skillService.getSkillById(id)
            );

        } catch (RuntimeException e) {

            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> createSkill(
            @RequestBody Map<String, String> data) {

        try {

            Skill skill = skillService.createSkill(
                    data.get("name"),
                    data.get("category")
            );

            return ResponseEntity.ok(skill);

        } catch (RuntimeException e) {

            return ResponseEntity.badRequest().body(
                    Map.of("message", e.getMessage())
            );
        }
    }
}