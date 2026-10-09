package com.skillsphere.backend.controller;

import com.skillsphere.backend.dto.StudentSkillResponse;
import com.skillsphere.backend.entity.StudentSkill;
import com.skillsphere.backend.service.StudentSkillService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/student-skills")
public class StudentSkillController {

    private final StudentSkillService studentSkillService;

    public StudentSkillController(
            StudentSkillService studentSkillService) {

        this.studentSkillService = studentSkillService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<StudentSkillResponse>> getStudentSkills(
            @PathVariable Integer userId) {

        List<StudentSkillResponse> response =
                studentSkillService.getStudentSkills(userId)
                        .stream()
                        .map(this::toResponse)
                        .toList();

        return ResponseEntity.ok(response);
    }

    @PostMapping("/{userId}")
    public ResponseEntity<?> addSkill(
            @PathVariable Integer userId,
            @RequestBody Map<String, Object> data) {

        try {

            Integer skillId =
                    ((Number) data.get("skillId")).intValue();

            String proficiency =
                    (String) data.get("proficiency");

            StudentSkill studentSkill =
                    studentSkillService.addSkill(
                            userId,
                            skillId,
                            proficiency
                    );

            return ResponseEntity.ok(
                    toResponse(studentSkill)
            );

        } catch (RuntimeException e) {

            return ResponseEntity.badRequest().body(
                    Map.of("message", e.getMessage())
            );
        }
    }

    @DeleteMapping("/{userId}/{skillId}")
    public ResponseEntity<?> removeSkill(
            @PathVariable Integer userId,
            @PathVariable Integer skillId) {

        try {

            studentSkillService.removeSkill(
                    userId,
                    skillId
            );

            return ResponseEntity.ok(
                    Map.of(
                            "message",
                            "Skill removed successfully"
                    )
            );

        } catch (RuntimeException e) {

            return ResponseEntity.badRequest().body(
                    Map.of("message", e.getMessage())
            );
        }
    }

    private StudentSkillResponse toResponse(
            StudentSkill studentSkill) {

        StudentSkillResponse response =
                new StudentSkillResponse();

        response.setId(studentSkill.getId());

        response.setUserId(
                studentSkill.getUser().getId()
        );

        response.setSkillName(
                studentSkill.getSkill().getName()
        );

        response.setCategory(
                studentSkill.getSkill().getCategory()
        );

        response.setProficiency(
                studentSkill.getProficiency()
        );

        return response;
    }
}