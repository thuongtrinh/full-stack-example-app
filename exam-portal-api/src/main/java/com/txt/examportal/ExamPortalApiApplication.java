package com.txt.examportal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ExamPortalApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(ExamPortalApiApplication.class, args);
    }

//    @Bean
//    CommandLineRunner run(UserRepository userRepository, RoleRepository roleRepository) {
//        return args -> {
//            // Create users
//            List<User> users = FileUtils.readUserJsonFile();
//            if(users != null) {
//                for (User user: users){
//                    userRepository.save(user);
//                }
//            }
//
//            // Create Roles
//            List<Role> roles = FileUtils.readRoleJsonFile();
//            if(roles != null) {
//                for (Role role: roles){
//                    roleRepository.save(role);
//                }
//            }
//        };
//    }

}
