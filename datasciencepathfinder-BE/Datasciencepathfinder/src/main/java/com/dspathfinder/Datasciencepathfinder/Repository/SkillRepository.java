package com.dspathfinder.Datasciencepathfinder.Repository;

import com.dspathfinder.Datasciencepathfinder.Model.ProficiencyLevels;
import com.dspathfinder.Datasciencepathfinder.Model.Skills;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface SkillRepository extends JpaRepository<Skills,Integer> {
    Optional<Skills> findBySkillName(String skillName);
    Optional<List<Skills>> findByProficiencyLevelsProficiencyId(int proficiencyId);
    List<Skills> findAllBySkillNameIn(Collection<String> skillNames);
    List<Skills> findAllByProficiencyLevels(ProficiencyLevels proficiencyLevel);
}
