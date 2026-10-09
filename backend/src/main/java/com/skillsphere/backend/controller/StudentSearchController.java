package com.skillsphere.backend.controller;

import com.skillsphere.backend.dto.StudentSearchResponse;
import com.skillsphere.backend.service.StudentSearchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentSearchController {

    private final StudentSearchService studentSearchService;

    public StudentSearchController(
            StudentSearchService studentSearchService) {

        this.studentSearchService = studentSearchService;
    }

    @GetMapping
    public ResponseEntity<List<StudentSearchResponse>> getStudents(
            @RequestParam(required = false) String skill,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String year) {

        return ResponseEntity.ok(
                studentSearchService.getStudents(
                        skill,
                        department,
                        year
                )
        );
    }
}