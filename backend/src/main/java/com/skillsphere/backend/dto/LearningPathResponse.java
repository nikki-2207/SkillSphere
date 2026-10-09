package com.skillsphere.backend.dto;

import java.util.List;

public class LearningPathResponse {

    private String careerGoal;

    private List<String> currentSkills;

    private List<String> learningPath;

    private Integer totalSteps;

    public LearningPathResponse() {
    }

    public String getCareerGoal() {
        return careerGoal;
    }

    public void setCareerGoal(String careerGoal) {
        this.careerGoal = careerGoal;
    }

    public List<String> getCurrentSkills() {
        return currentSkills;
    }

    public void setCurrentSkills(List<String> currentSkills) {
        this.currentSkills = currentSkills;
    }

    public List<String> getLearningPath() {
        return learningPath;
    }

    public void setLearningPath(List<String> learningPath) {
        this.learningPath = learningPath;
    }

    public Integer getTotalSteps() {
        return totalSteps;
    }

    public void setTotalSteps(Integer totalSteps) {
        this.totalSteps = totalSteps;
    }
}