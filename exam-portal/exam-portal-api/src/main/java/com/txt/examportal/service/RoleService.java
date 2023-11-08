package com.txt.examportal.service;

import com.txt.examportal.model.Role;
import com.txt.examportal.model.User;
import com.txt.examportal.model.UserRole;

import java.util.List;
import java.util.Set;

public interface RoleService {

    Role createRole(Role user);

    Role updateRole(Role user);

    List<Role> findAllRoles();

    Role findRoleById(Long id);

    Role findRoleByRoleCode(String roleCode);

    void deleteRole(Long id);
}
