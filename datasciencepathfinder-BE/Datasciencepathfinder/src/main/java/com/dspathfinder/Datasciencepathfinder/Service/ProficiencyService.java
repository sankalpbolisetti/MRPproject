package com.dspathfinder.Datasciencepathfinder.Service;

import com.dspathfinder.Datasciencepathfinder.Model.ProficiencyLevels;
import com.dspathfinder.Datasciencepathfinder.Repository.ProficiencyRepository;
import org.springframework.stereotype.Service;

@Service
public class ProficiencyService {
    private final ProficiencyRepository proficiencyRepository;
    public ProficiencyService(ProficiencyRepository proficiencyRepository){
        this.proficiencyRepository  = proficiencyRepository;
    }
    public void addProfLevel(ProficiencyLevels proficiencyLevels){
        proficiencyRepository.save(proficiencyLevels);
    }
}
