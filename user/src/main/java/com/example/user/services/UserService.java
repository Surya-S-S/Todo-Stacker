package com.example.user.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.user.exceptions.InvalidCredentialsException;
import com.example.user.exceptions.UserAlreadyExistsException;
import com.example.user.exceptions.UserNotFoundException;
import com.example.user.models.User;
import com.example.user.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    
    public String addUser(User user) {
        User existingUser = userRepository.findByUserName(user.getUserName()).orElse(null);
        if(existingUser == null) {
            userRepository.save(user);
            return "User added Successfully";
        }
        else throw new UserAlreadyExistsException("User already exists");        
    }

    public User loginUser(User user) {
        userRepository.findByUserName(user.getUserName()).orElseThrow(() -> new UserNotFoundException("User not found"));
        return userRepository.findByUserNameAndPassword(user.getUserName(),user.getPassword()).orElseThrow(() -> new InvalidCredentialsException("Invalid credentials"));
    }
}
