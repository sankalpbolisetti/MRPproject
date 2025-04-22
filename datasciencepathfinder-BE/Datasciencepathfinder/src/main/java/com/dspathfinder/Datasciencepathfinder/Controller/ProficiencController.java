package com.dspathfinder.Datasciencepathfinder.Controller;

import com.dspathfinder.Datasciencepathfinder.Model.ProficiencyLevels;
import com.dspathfinder.Datasciencepathfinder.Service.ProficiencyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// never used this controller defined only to enter the levels instead of doing it through SQL queries
@RestController
@RequestMapping("profeciency")
public class ProficiencController {
    @Autowired
    private ProficiencyService proficiencyService;
    @PostMapping
    public void addProfLevel(@RequestBody ProficiencyLevels proficiencyLevels){
        proficiencyService.addProfLevel(proficiencyLevels);
    }
}
