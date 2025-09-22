package com.txt.rest.health.care.service.auth;

import com.txt.rest.health.care.entity.postgres.Users;
import com.txt.rest.health.care.repository.postgres.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserInfoService implements UserDetailsService {

    private final UsersRepository usersRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Fetch user from the database by email (username)
        Users userInfo = usersRepository.findByEmail(email);
        if (ObjectUtils.isEmpty(userInfo)) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }

        // Convert UserInfo to UserInfoDetails
        return new UserInfoDetails(userInfo);
    }
}
