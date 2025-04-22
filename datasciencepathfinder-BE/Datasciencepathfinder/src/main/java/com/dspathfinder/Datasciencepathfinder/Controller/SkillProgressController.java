package com.dspathfinder.Datasciencepathfinder.Controller;

import com.dspathfinder.Datasciencepathfinder.Model.Users;
import com.dspathfinder.Datasciencepathfinder.Repository.UserRepository;
import com.dspathfinder.Datasciencepathfinder.Service.SkillProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("progress")
public class SkillProgressController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SkillProgressService skillProgressService;
    @PostMapping("/{level}")
    public void saveUserProgress(@PathVariable String level, @RequestBody List<String> skills , Authentication authentication){
       String email = (String) authentication.getPrincipal();
        Users user = userRepository.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));

        skillProgressService.saveUserProgress(skills,user,level);
    }
}
