package com.txt.examportal.service.impl;

import com.txt.examportal.dto.request.AssignRoleRequest;
import com.txt.examportal.exception.UserFoundException;
import com.txt.examportal.exception.UserNotFoundException;
import com.txt.examportal.model.Role;
import com.txt.examportal.model.User;
import com.txt.examportal.model.UserRole;
import com.txt.examportal.repository.RoleRepository;
import com.txt.examportal.repository.UserRepository;
import com.txt.examportal.repository.UserRoleRepository;
import com.txt.examportal.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Set;

@Service
@Slf4j
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public User createUser(User userInfo, Set<UserRole> userRoles) {
        User userlocal = userRepository.findByUserName(userInfo.getUsername());

        if (userlocal != null) {
            log.warn("Role existing in database");
            throw new UserFoundException("User existing in database");
        }

        for (UserRole userRole : userRoles) {
            userRoleRepository.save(userRole);
        }

        userlocal.getUserRoles().addAll(userRoles);
        User user = userRepository.save(userlocal);

        return user;
    }

    @Override
    public User createUser(User userInfo) {
        User userlocal = userRepository.findByUserName(userInfo.getUsername());

        if (userlocal != null) {
            log.warn("Role existing in database");
            throw new UserFoundException();
        }

        User user = userRepository.save(userInfo);

        return user;
    }

    @Override
    public User updateUser(User user) {
        return null;
    }

    @Override
    public User findUserById(Long id) {
        User user = userRepository.findById(id).get();
        return user;
    }

    @Override
    public List<User> findAllUsers() {
        List<User> users = userRepository.findAll();
        return users;
    }

    @Override
    public User findUserByUsername(String username) {
        User user = userRepository.findByUserName(username);
        return user;
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public UserRole assignRole(AssignRoleRequest request) {
        User user = userRepository.getById(request.getUserId());
        Role role = roleRepository.getById(request.getRoleId());

        if(user == null || role == null){
            log.warn("Role existing in database");
            throw new UserNotFoundException("User or Role not existing in database");
        }

        UserRole userRole = new UserRole();
        userRole.setRole(role);
        userRole.setUser(user);
        UserRole usrRole = userRoleRepository.save(userRole);
        return usrRole;
    }

    @Override
    public void removeRole(AssignRoleRequest request) {
        User user = userRepository.getById(request.getUserId());
        Role role = roleRepository.getById(request.getRoleId());

        if(user == null || role == null){
            log.warn("Role existing in database");
            throw new UserNotFoundException("User or Role not existing in database");
        }

        userRoleRepository.deleteByUserIdAndRoleId(user.getId(), role.getId());
    }
}
