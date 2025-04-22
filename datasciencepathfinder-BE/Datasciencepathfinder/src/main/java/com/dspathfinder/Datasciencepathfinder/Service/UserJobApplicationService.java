package com.dspathfinder.Datasciencepathfinder.Service;

import com.dspathfinder.Datasciencepathfinder.DTO.UserJobsDTO;
import com.dspathfinder.Datasciencepathfinder.Model.ProficiencyLevels;
import com.dspathfinder.Datasciencepathfinder.Model.UserJobsApplied;
import com.dspathfinder.Datasciencepathfinder.Model.Users;
import com.dspathfinder.Datasciencepathfinder.Repository.ProficiencyRepository;
import com.dspathfinder.Datasciencepathfinder.Repository.UserJobApplicationRepository;
import com.dspathfinder.Datasciencepathfinder.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserJobApplicationService {
    @Autowired
    private UserJobApplicationRepository userJobApplicationRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProficiencyRepository proficiencyRepository;
    public void addUserSavedJobs(List<UserJobsDTO> userJobsApplied, String email,String level){
        Users user = userRepository.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ProficiencyLevels skilllevel = proficiencyRepository.findByProficiencyName(level)
                .orElseThrow(() -> new RuntimeException("Invalid skill level"));

        for (UserJobsDTO jobDto : userJobsApplied) {
            boolean alreadyApplied = userJobApplicationRepository.existsByUserAndJobIdAppliedAndIsAppliedTrue(
                    user, jobDto.getJobId());

            if (alreadyApplied) {
                System.out.println("Skipping already applied job ID: " + jobDto.getJobId());
                continue;
            }

            UserJobsApplied job = new UserJobsApplied();
            job.setJobIdApplied(jobDto.getJobId());
            job.setTitle(jobDto.getTitle());
            job.setCompany(jobDto.getCompany());
            job.setJobUrl(jobDto.getApplicationUrl());
            job.setApplied(true);
            job.setUser(user);
            job.setProficiencyLevel(skilllevel);
            job.setCreatedAt(LocalDateTime.now());

            userJobApplicationRepository.save(job);
        }
    }

    public List<UserJobsApplied> getUserAppliedJobs(String email,String level){
        Users user = userRepository.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ProficiencyLevels skilllevel = proficiencyRepository.findByProficiencyName(level)
                .orElseThrow(() -> new RuntimeException("Invalid skill level"));

        return userJobApplicationRepository.findAllByUserAndProficiencyLevel(user,skilllevel);


    }
}
