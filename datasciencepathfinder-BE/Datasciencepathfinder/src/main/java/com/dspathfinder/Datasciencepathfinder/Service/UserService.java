package com.dspathfinder.Datasciencepathfinder.Service;

import com.dspathfinder.Datasciencepathfinder.Model.Users;
import com.dspathfinder.Datasciencepathfinder.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    public ResponseEntity<?> userInfo(Users user){
        if(userRepository.findByUserEmail(user.getUserEmail()).isEmpty()) {
            userRepository.save(user);
            return new ResponseEntity<>("User added successfully", HttpStatus.CREATED);
        }
        return new ResponseEntity<>("User already exists",HttpStatus.BAD_REQUEST);
    }
}
