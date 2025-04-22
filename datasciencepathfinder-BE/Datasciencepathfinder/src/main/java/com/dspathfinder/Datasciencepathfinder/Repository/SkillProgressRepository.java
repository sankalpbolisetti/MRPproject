package com.dspathfinder.Datasciencepathfinder.Repository;

import com.dspathfinder.Datasciencepathfinder.Model.ProficiencyLevels;
import com.dspathfinder.Datasciencepathfinder.Model.Skills;
import com.dspathfinder.Datasciencepathfinder.Model.UserSkillProgress;
import com.dspathfinder.Datasciencepathfinder.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface SkillProgressRepository extends JpaRepository<UserSkillProgress,Integer> {
    boolean existsByUserAndSkill(Users user, Skills skill);
    List<UserSkillProgress> findAllByUser(Users user);
    List<UserSkillProgress> findAllByUserAndProficiencyLevel(Users user, ProficiencyLevels proficiencyLevel);


}
