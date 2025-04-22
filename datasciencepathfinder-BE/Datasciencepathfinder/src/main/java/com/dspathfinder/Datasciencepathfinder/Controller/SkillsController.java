package com.dspathfinder.Datasciencepathfinder.Controller;

import com.dspathfinder.Datasciencepathfinder.DTO.SkillProgressDto;
import com.dspathfinder.Datasciencepathfinder.Model.Skills;
import com.dspathfinder.Datasciencepathfinder.Service.SkillsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("skills")
public class SkillsController {
    @Autowired
    private SkillsService skillsService;
    @PostMapping
    public ResponseEntity<?> addSkill(@RequestBody Skills skill){
        return skillsService.addSkills(skill);
    }

    @GetMapping("/{skillLevel}")
    public List<SkillProgressDto> getSkillsAndCourses(@PathVariable String skillLevel, Authentication authentication){
        System.out.println("skill level is set to "+skillLevel);
        String email = (String) authentication.getPrincipal();
        System.out.println(email);
        return skillsService.getSkillsAndCourses(skillLevel,email);
    }

}
