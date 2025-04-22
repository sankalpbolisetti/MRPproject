package com.dspathfinder.Datasciencepathfinder.Service;

import com.dspathfinder.Datasciencepathfinder.Model.ProficiencyLevels;
import com.dspathfinder.Datasciencepathfinder.Model.Skills;
import com.dspathfinder.Datasciencepathfinder.Model.UserSkillProgress;
import com.dspathfinder.Datasciencepathfinder.Model.Users;
import com.dspathfinder.Datasciencepathfinder.Repository.ProficiencyRepository;
import com.dspathfinder.Datasciencepathfinder.Repository.SkillProgressRepository;
import com.dspathfinder.Datasciencepathfinder.Repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class SkillProgressService {
    @Autowired
    private SkillProgressRepository skillProgressRepository;

    @Autowired
    private SkillRepository skillRepository;
    @Autowired
    private ProficiencyRepository proficiencyRepository;
    public void saveUserProgress(List<String> selectedSkillNames, Users user, String skillLevel) {
        // Get proficiency level
        ProficiencyLevels level = proficiencyRepository.findByProficiencyName(skillLevel)
                .orElseThrow(() -> new RuntimeException("Invalid skill level: " + skillLevel));

        Set<String> selectedSkills = new HashSet<>(selectedSkillNames);

        // Fetch existing progress for this user and this level only
        List<UserSkillProgress> existingProgressList =
                skillProgressRepository.findAllByUserAndProficiencyLevel(user, level);

        Map<String, UserSkillProgress> progressMap = existingProgressList.stream()
                .collect(Collectors.toMap(p -> p.getSkill().getSkillName(), Function.identity()));

        // Fetch all skills by name (only relevant to selected + existing)
        Set<String> allSkillNames = new HashSet<>(selectedSkillNames);
        allSkillNames.addAll(progressMap.keySet());

        List<Skills> allRelevantSkills = skillRepository.findAllBySkillNameIn(allSkillNames);

        for (Skills skill : allRelevantSkills) {
            boolean shouldBeCompleted = selectedSkills.contains(skill.getSkillName());
            UserSkillProgress progress = progressMap.get(skill.getSkillName());

            if (progress != null) {
                // Update only if status changes
                if (progress.getIsCompleted() != shouldBeCompleted) {
                    progress.setIsCompleted(shouldBeCompleted);
                    skillProgressRepository.save(progress);
                }
            } else if (shouldBeCompleted) {
                // New entry
                UserSkillProgress newProgress = new UserSkillProgress();
                newProgress.setUser(user);
                newProgress.setSkill(skill);
                newProgress.setProficiencyLevel(level);
                newProgress.setIsCompleted(true);
                skillProgressRepository.save(newProgress);
            }
        }
    }


}
