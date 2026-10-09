package com.skillsphere.backend.service;

import com.skillsphere.backend.dto.StudyGroupResponse;
import com.skillsphere.backend.entity.StudyGroup;
import com.skillsphere.backend.entity.User;
import com.skillsphere.backend.repository.StudyGroupRepository;
import com.skillsphere.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class StudyGroupService {

    private final StudyGroupRepository studyGroupRepository;
    private final UserRepository userRepository;

    public StudyGroupService(
            StudyGroupRepository studyGroupRepository,
            UserRepository userRepository) {

        this.studyGroupRepository = studyGroupRepository;
        this.userRepository = userRepository;
    }

    public List<StudyGroupResponse> getAllGroups() {

        return studyGroupRepository
                .findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public StudyGroupResponse getGroupById(Integer id) {

        StudyGroup group =
                studyGroupRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Study group not found"));

        return toResponse(group);
    }

    public List<StudyGroupResponse> getGroupsByCreator(
            Integer userId) {

        return studyGroupRepository
                .findByCreatedByOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public StudyGroupResponse createGroup(
            Integer createdBy,
            String name,
            String description) {

        if (!userRepository.existsById(createdBy)) {
            throw new RuntimeException("User not found");
        }

        if (name == null || name.trim().isEmpty()) {
            throw new RuntimeException(
                    "Study group name is required");
        }

        StudyGroup group = new StudyGroup();

        group.setName(name.trim());
        group.setDescription(description);
        group.setCreatedBy(createdBy);
        group.setCreatedAt(LocalDateTime.now());

        StudyGroup saved =
                studyGroupRepository.save(group);

        return toResponse(saved);
    }

    private StudyGroupResponse toResponse(
            StudyGroup group) {

        StudyGroupResponse response =
                new StudyGroupResponse();

        response.setId(group.getId());
        response.setName(group.getName());
        response.setDescription(group.getDescription());
        response.setCreatedBy(group.getCreatedBy());
        response.setCreatedAt(group.getCreatedAt());

        User creator =
                userRepository
                        .findById(group.getCreatedBy())
                        .orElse(null);

        if (creator != null) {
            response.setCreatorName(creator.getName());
            response.setCreatorEmail(creator.getEmail());
        }

        return response;
    }
}