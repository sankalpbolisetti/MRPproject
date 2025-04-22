package com.dspathfinder.Datasciencepathfinder.Model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
@Entity
@Data
public class UserJobsApplied {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userJobAppliedId;

    @Column(nullable = false)
    private long jobIdApplied;

    @Column(nullable = false)
    private String jobUrl;

    private boolean isApplied;

    private String title;
    private String company;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;

    @ManyToOne
    @JoinColumn(name = "proficiency_id")
    private ProficiencyLevels proficiencyLevel;
}
