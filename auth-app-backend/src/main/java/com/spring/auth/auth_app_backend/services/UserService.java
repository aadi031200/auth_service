package com.spring.auth.auth_app_backend.services;

import com.spring.auth.auth_app_backend.dtos.UserDto;

public interface UserService {

    //create user
    UserDto createUser(UserDto userDto);

    //get user by email
    UserDto getUserByEmail(String email);

    //update user
    UserDto updateUser(UserDto userDto,String userId);

    //delete user
    void deleteUser(String userId);

    //getUser by ID
    UserDto getUserById(String userId);

    //get all users
    Iterable<UserDto> getAllUsers();

}
