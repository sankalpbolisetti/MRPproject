package com.dspathfinder.Datasciencepathfinder.Model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class UserSkillProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userSkillProgressId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;

    @ManyToOne
    @JoinColumn(name = "skill_id")
    private Skills skill;

    @ManyToOne
    @JoinColumn(name = "proficiency_id")
    private ProficiencyLevels proficiencyLevel;

    private Boolean isCompleted;
}
