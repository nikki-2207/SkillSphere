package com.skillsphere.backend.service;

import com.skillsphere.backend.dto.StudyGroupMemberResponse;
import com.skillsphere.backend.entity.StudyGroupMember;
import com.skillsphere.backend.entity.User;
import com.skillsphere.backend.repository.StudyGroupMemberRepository;
import com.skillsphere.backend.repository.StudyGroupRepository;
import com.skillsphere.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class StudyGroupMemberService {

    private final StudyGroupMemberRepository memberRepository;
    private final StudyGroupRepository groupRepository;
    private final UserRepository userRepository;

    public StudyGroupMemberService(
            StudyGroupMemberRepository memberRepository,
            StudyGroupRepository groupRepository,
            UserRepository userRepository) {

        this.memberRepository = memberRepository;
        this.groupRepository = groupRepository;
        this.userRepository = userRepository;
    }

    public List<StudyGroupMemberResponse> getMembers(
            Integer groupId) {

        if (!groupRepository.existsById(groupId)) {
            throw new RuntimeException("Study group not found");
        }

        return memberRepository
                .findByGroupId(groupId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public StudyGroupMemberResponse joinGroup(
            Integer groupId,
            Integer userId) {

        if (!groupRepository.existsById(groupId)) {
            throw new RuntimeException("Study group not found");
        }

        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found");
        }

        if (memberRepository
                .existsByGroupIdAndUserId(groupId, userId)) {

            throw new RuntimeException(
                    "User is already a member of this study group");
        }

        StudyGroupMember member =
                new StudyGroupMember();

        member.setGroupId(groupId);
        member.setUserId(userId);
        member.setJoinedAt(LocalDateTime.now());

        StudyGroupMember saved =
                memberRepository.save(member);

        return toResponse(saved);
    }

    @Transactional
    public void leaveGroup(
            Integer groupId,
            Integer userId) {

        if (!groupRepository.existsById(groupId)) {
            throw new RuntimeException("Study group not found");
        }

        if (!memberRepository
                .existsByGroupIdAndUserId(groupId, userId)) {

            throw new RuntimeException(
                    "User is not a member of this study group");
        }

        memberRepository.deleteByGroupIdAndUserId(
                groupId,
                userId
        );
    }

    private StudyGroupMemberResponse toResponse(
            StudyGroupMember member) {

        StudyGroupMemberResponse response =
                new StudyGroupMemberResponse();

        response.setId(member.getId());
        response.setGroupId(member.getGroupId());
        response.setUserId(member.getUserId());
        response.setJoinedAt(member.getJoinedAt());

        User user =
                userRepository
                        .findById(member.getUserId())
                        .orElse(null);

        if (user != null) {
            response.setUserName(user.getName());
            response.setUserEmail(user.getEmail());
        }

        return response;
    }
}