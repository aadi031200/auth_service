package com.spring.auth.auth_app_backend.services;

import com.spring.auth.auth_app_backend.dtos.UserDto;
import com.spring.auth.auth_app_backend.repositories.UserRepository;
import org.apache.catalina.UserDatabase;

public interface AuthService {

    UserDto registerUser(UserDto userDto);
}
