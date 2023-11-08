package com.txt.examportal.controller;

import com.txt.examportal.config.security.JwtUserDetailsService;
import com.txt.examportal.config.security.JwtUtils;
import com.txt.examportal.dto.request.JwtRequest;
import com.txt.examportal.dto.response.JwtResponse;
import com.txt.examportal.dto.response.Response;
import com.txt.examportal.model.User;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;

@RestController
@Slf4j
@RequestMapping("/authen")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/generate-token")
    public ResponseEntity<Response> generateToken(@RequestBody JwtRequest jwtReq) {
        String token = authenticate(jwtReq.getUserName(), jwtReq.getPassword());

        if (StringUtils.isEmpty(token)) {
            return  ResponseEntity.badRequest().body(
                    Response.builder()
                            .timeStamp(LocalDateTime.now())
                            .message("Authentication fail. Username or password invalid")
                            .status(HttpStatus.BAD_REQUEST)
                            .statusCode(HttpStatus.BAD_REQUEST.value())
                            .build());
        }

        JwtResponse jwtResp = new JwtResponse();
        jwtResp.setToken(token);

        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(LocalDateTime.now())
                        .result(jwtResp)
                        .message("Authenticate successful")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }

    private String authenticate(String username, String password) {
        String token = null;
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
            UserDetails userDetails = this.jwtUserDetailsService.loadUserByUsername(username);
            token = this.jwtUtils.generateToken(userDetails);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("Authentication fail. Username or password invalid");
        }

        return token;
    }

    @GetMapping("/current-user")
    public ResponseEntity<Response> getCurrentUser(Principal principal) {
        try {
            User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//          his.jwtUserDetailsService.loadUserByUsername(principal.getName());
            if (user != null) {
                return ResponseEntity.ok(
                        Response.builder()
                                .timeStamp(LocalDateTime.now())
                                .result(user)
                                .message("User login info")
                                .status(HttpStatus.OK)
                                .statusCode(HttpStatus.OK.value())
                                .build()
                );
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error(e.getMessage());
        }

        return  ResponseEntity.badRequest().body(
                Response.builder()
                        .timeStamp(LocalDateTime.now())
                        .message("User not found")
                        .status(HttpStatus.BAD_REQUEST)
                        .statusCode(HttpStatus.BAD_REQUEST.value())
                        .build());
    }
}
