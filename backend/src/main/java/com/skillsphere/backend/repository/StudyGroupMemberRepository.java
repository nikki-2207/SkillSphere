package com.skillsphere.backend.repository;

import com.skillsphere.backend.entity.StudyGroupMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StudyGroupMemberRepository
        extends JpaRepository<StudyGroupMember, Integer> {

    List<StudyGroupMember> findByGroupId(Integer groupId);

    boolean existsByGroupIdAndUserId(
            Integer groupId,
            Integer userId
    );

    Optional<StudyGroupMember> findByGroupIdAndUserId(
            Integer groupId,
            Integer userId
    );

    @Modifying
    @Query("""
        DELETE FROM StudyGroupMember m
        WHERE m.groupId = :groupId
        AND m.userId = :userId
    """)
    void deleteByGroupIdAndUserId(
            @Param("groupId") Integer groupId,
            @Param("userId") Integer userId
    );
}