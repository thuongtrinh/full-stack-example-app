package com.txt.examportal.service.impl;

import com.txt.examportal.model.Role;
import com.txt.examportal.repository.RoleRepository;
import com.txt.examportal.service.RoleService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Slf4j
@Transactional
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public Role createRole(Role roleInfo)  {
        Role roleLocal = roleRepository.findByRoleCode(roleInfo.getRoleCode());

        if(roleLocal != null){
            log.warn("Role existing in database");
            throw new RuntimeException("Role existing in database");
        }

        Role role = roleRepository.save(roleLocal);
        return role;
    }

    @Override
    public Role updateRole(Role roleInfo) {
        Role roleLocal = roleRepository.findByRoleCode(roleInfo.getRoleCode());

        if(roleLocal == null){
            log.warn("Role not existing in database");
            throw new RuntimeException("Role not existing in database");
        }

        Role role = roleRepository.save(roleLocal);
        return role;
    }

    @Override
    public List<Role> findAllRoles() {
        List<Role> roles = roleRepository.findAll();
        return roles;
    }

    @Override
    public Role findRoleById(Long id) {
        Role role = roleRepository.findById(id).get();
        return role;
    }

    @Override
    public Role findRoleByRoleCode(String roleCode) {
        Role role = roleRepository.findByRoleCode(roleCode);
        return role;
    }

    @Override
    public void deleteRole(Long id) {
        roleRepository.deleteById(id);
    }

}
