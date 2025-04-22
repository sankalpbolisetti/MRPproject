package com.dspathfinder.Datasciencepathfinder.Controller;

import com.dspathfinder.Datasciencepathfinder.DTO.UserJobsDTO;
import com.dspathfinder.Datasciencepathfinder.Model.UserJobsApplied;
import com.dspathfinder.Datasciencepathfinder.Service.UserJobApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("applications")
public class UserJobApplicationsController {
    @Autowired
    private UserJobApplicationService userJobApplicationService;
    @PostMapping("{level}")
    public void addUserSavedJobs(@PathVariable String level, @RequestBody List<UserJobsDTO> jobs, Authentication authentication){
        String email = (String) authentication.getPrincipal();
        System.out.println(jobs);
        userJobApplicationService.addUserSavedJobs(jobs,email,level);
    }

    @GetMapping("{level}")
    public List<UserJobsApplied> getUserAppliedJobs(@PathVariable String level, Authentication authentication){
        String email = (String) authentication.getPrincipal();
        return userJobApplicationService.getUserAppliedJobs(email,level);
    }

}
