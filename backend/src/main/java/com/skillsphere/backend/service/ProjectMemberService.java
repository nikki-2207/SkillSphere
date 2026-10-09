package com.skillsphere.backend.service;

import com.skillsphere.backend.dto.ProjectMemberResponse;
import com.skillsphere.backend.entity.ProjectMember;
import com.skillsphere.backend.entity.User;
import com.skillsphere.backend.repository.ProjectMemberRepository;
import com.skillsphere.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProjectMemberService {

    private final ProjectMemberRepository projectMemberRepository;
    private final UserRepository userRepository;

    public ProjectMemberService(
            ProjectMemberRepository projectMemberRepository,
            UserRepository userRepository) {

        this.projectMemberRepository = projectMemberRepository;
        this.userRepository = userRepository;
    }

    public List<ProjectMemberResponse> getProjectMembers(
            Integer projectId) {

        return projectMemberRepository
                .findByProjectId(projectId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public ProjectMemberResponse addMember(
            Integer projectId,
            Integer userId,
            String role) {

        if (projectMemberRepository
                .existsByProjectIdAndUserId(projectId, userId)) {

            throw new RuntimeException(
                    "Student is already a member of this project"
            );
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Student not found"
                        ));

        ProjectMember projectMember =
                new ProjectMember();

        projectMember.setProjectId(projectId);
        projectMember.setUserId(userId);
        projectMember.setRole(
                role == null || role.trim().isEmpty()
                        ? "MEMBER"
                        : role.trim()
        );

        ProjectMember saved =
                projectMemberRepository.save(projectMember);

        return toResponse(saved);
    }

    @Transactional
    public void removeMember(
            Integer projectId,
            Integer userId) {

        if (!projectMemberRepository
                .existsByProjectIdAndUserId(projectId, userId)) {

            throw new RuntimeException(
                    "Student is not a member of this project"
            );
        }

        projectMemberRepository.deleteByProjectIdAndUserId(
                projectId,
                userId
        );
    }

    private ProjectMemberResponse toResponse(
            ProjectMember projectMember) {

        ProjectMemberResponse response =
                new ProjectMemberResponse();

        response.setId(projectMember.getId());
        response.setProjectId(projectMember.getProjectId());
        response.setUserId(projectMember.getUserId());
        response.setRole(projectMember.getRole());

        User user = userRepository
                .findById(projectMember.getUserId())
                .orElse(null);

        if (user != null) {
            response.setUserName(user.getName());
            response.setUserEmail(user.getEmail());
        }

        return response;
    }
}