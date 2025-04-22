package com.dspathfinder.Datasciencepathfinder.Controller;

import com.dspathfinder.Datasciencepathfinder.Model.Users;
import com.dspathfinder.Datasciencepathfinder.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("users")
public class UserController {
    @Autowired
    private UserService userService;
    @PostMapping
    public ResponseEntity<?> userInfo(@RequestBody Users user){
        System.out.println(user);
        return userService.userInfo(user);
    }
}
