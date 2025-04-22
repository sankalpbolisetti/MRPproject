package com.dspathfinder.Datasciencepathfinder.Repository;

import com.dspathfinder.Datasciencepathfinder.Model.ProficiencyLevels;
import com.dspathfinder.Datasciencepathfinder.Model.UserJobsApplied;
import com.dspathfinder.Datasciencepathfinder.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserJobApplicationRepository extends JpaRepository<UserJobsApplied,Integer> {
    boolean existsByUserAndJobIdAppliedAndIsAppliedTrue(Users user, long jobExternalId);

    List<UserJobsApplied> findAllByUserAndProficiencyLevel(Users user, ProficiencyLevels level);

}
