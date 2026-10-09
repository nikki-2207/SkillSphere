package com.skillsphere.backend.dto;

import java.util.List;

public class SkillGapResponse {

    private String careerGoal;

    private List<String> currentSkills;

    private List<String> missingSkills;

    private List<String> recommendedSkills;

    private Integer skillCoverage;

    public SkillGapResponse() {
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

    public List<String> getMissingSkills() {
        return missingSkills;
    }

    public void setMissingSkills(List<String> missingSkills) {
        this.missingSkills = missingSkills;
    }

    public List<String> getRecommendedSkills() {
        return recommendedSkills;
    }

    public void setRecommendedSkills(List<String> recommendedSkills) {
        this.recommendedSkills = recommendedSkills;
    }

    public Integer getSkillCoverage() {
        return skillCoverage;
    }

    public void setSkillCoverage(Integer skillCoverage) {
        this.skillCoverage = skillCoverage;
    }
}