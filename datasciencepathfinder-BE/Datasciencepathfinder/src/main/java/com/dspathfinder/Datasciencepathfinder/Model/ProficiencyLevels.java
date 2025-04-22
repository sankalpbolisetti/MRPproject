package com.dspathfinder.Datasciencepathfinder.Model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ProficiencyLevels {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int proficiencyId;

    @Column(name="proficiency_name",nullable = false,unique = true)
    private String proficiencyName;
}
