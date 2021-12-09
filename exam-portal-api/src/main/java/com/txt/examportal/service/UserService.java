package com.txt.examportal.service;

import com.txt.examportal.dto.request.AssignRoleRequest;
import com.txt.examportal.model.User;
import com.txt.examportal.model.UserRole;

import java.util.List;
import java.util.Set;

public interface UserService {

    User createUser(User user, Set<UserRole> userRoles);

    User createUser(User user);

    User updateUser(User user);

    User findUserById(Long id);

    List<User> findAllUsers();

    User findUserByUsername(String username);

    void deleteUser(Long id);

    UserRole assignRole(AssignRoleRequest request);

    void removeRole(AssignRoleRequest request);
}
