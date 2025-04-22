package com.dspathfinder.Datasciencepathfinder.DTO;

import lombok.Data;

@Data
public class SkillProgressDto {
    private String skillName;
    private String skillUrl;
    private boolean isChecked;

    public SkillProgressDto(String skillName, String skillUrl, boolean isChecked) {
        this.skillName = skillName;
        this.skillUrl = skillUrl;
        this.isChecked = isChecked;
    }
}
