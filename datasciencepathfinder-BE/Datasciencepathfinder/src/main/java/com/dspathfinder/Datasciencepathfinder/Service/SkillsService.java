package com.dspathfinder.Datasciencepathfinder.Service;


import com.dspathfinder.Datasciencepathfinder.DTO.SkillProgressDto;
import com.dspathfinder.Datasciencepathfinder.Model.ProficiencyLevels;
import com.dspathfinder.Datasciencepathfinder.Model.Skills;
import com.dspathfinder.Datasciencepathfinder.Model.UserSkillProgress;
import com.dspathfinder.Datasciencepathfinder.Model.Users;
import com.dspathfinder.Datasciencepathfinder.Repository.ProficiencyRepository;
import com.dspathfinder.Datasciencepathfinder.Repository.SkillProgressRepository;
import com.dspathfinder.Datasciencepathfinder.Repository.SkillRepository;
import com.dspathfinder.Datasciencepathfinder.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class SkillsService {
    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private ProficiencyRepository proficiencyRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SkillProgressRepository skillProgressRepository;
    public ResponseEntity<?> addSkills(Skills skills){
        if(skillRepository.findBySkillName(skills.getSkillName()).isEmpty()){
            skillRepository.save(skills);
            return new ResponseEntity<>("Skill addded successfully", HttpStatus.CREATED);
        }
        return new ResponseEntity<>("Skill already existed",HttpStatus.BAD_REQUEST);
    }

    public List<SkillProgressDto> getSkillsAndCourses(String skillLevel,String email){
        Users user = userRepository.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ProficiencyLevels level = proficiencyRepository.findByProficiencyName(skillLevel)
                .orElseThrow(() -> new RuntimeException("Invalid skill level"));

        List<Skills> skills = skillRepository.findAllByProficiencyLevels(level);

        List<UserSkillProgress> progressList = skillProgressRepository.findAllByUserAndProficiencyLevel(user, level);
        Set<Integer> completedSkillIds = progressList.stream()
                .filter(UserSkillProgress::getIsCompleted)
                .map(p -> p.getSkill().getSkillId())
                .collect(Collectors.toSet());

        return skills.stream()
                .map(skill -> new SkillProgressDto(
                        skill.getSkillName(),
                        skill.getSkillUrl(),
                        completedSkillIds.contains(skill.getSkillId())
                ))
                .collect(Collectors.toList());
    }
}
