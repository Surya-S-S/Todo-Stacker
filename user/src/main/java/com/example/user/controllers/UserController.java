package com.example.user.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.user.models.LoginResponse;
import com.example.user.models.User;
import com.example.user.services.UserService;
import com.example.user.utils.JwtUtil;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

@RestController
@RequestMapping("/api/user")
@OpenAPIDefinition(info = @Info(title = "UserController API", description = "UserController API endpoints Information"))
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        String response = userService.addUser(user);
        return new ResponseEntity<>(response,HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@RequestBody User user) {
        User userData = userService.loginUser(user);
        String token = jwtUtil.generateToken(userData.getUserName());
        LoginResponse response = new LoginResponse();
        response.setUserId(userData.getUserId());
        response.setUserName(userData.getUserName());
        response.setToken(token);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
}
