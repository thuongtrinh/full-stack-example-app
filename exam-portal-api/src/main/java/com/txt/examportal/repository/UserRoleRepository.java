package com.txt.examportal.repository;

import com.txt.examportal.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, Long> {

    @Modifying
    void deleteByUserIdAndRoleId(Long userId, Long roleId);
}
