package com.dspathfinder.Datasciencepathfinder.Model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Skills {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int skillId;

    @Column(name="skill_name",nullable = false,unique = true)
    private String skillName;

    @Column(name="skill_url",nullable = false,unique = true)
    private String skillUrl;

    @ManyToOne
    @JoinColumn(name = "proficiency_id")
    private ProficiencyLevels proficiencyLevels;
}
