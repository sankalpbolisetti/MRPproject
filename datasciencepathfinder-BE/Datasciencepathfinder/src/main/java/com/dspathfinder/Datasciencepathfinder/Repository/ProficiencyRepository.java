package com.dspathfinder.Datasciencepathfinder.Repository;

import com.dspathfinder.Datasciencepathfinder.Model.ProficiencyLevels;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProficiencyRepository extends JpaRepository<ProficiencyLevels,Integer> {
    Optional<ProficiencyLevels> findByProficiencyName(String proficiencyName);
}
