package com.spring.auth.auth_app_backend.services.impl;

import com.spring.auth.auth_app_backend.dtos.UserDto;
import com.spring.auth.auth_app_backend.services.AuthService;
import com.spring.auth.auth_app_backend.services.UserService;
import lombok.AllArgsConstructor;
import org.apache.catalina.UserDatabase;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDto registerUser(UserDto userDto) {

        //login
        //verify password
        //verify email
        //default roles
        userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));

        return userService.createUser(userDto);
    }
}
