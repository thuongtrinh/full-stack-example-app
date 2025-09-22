package com.txt.rest.health.care.filter;

import com.txt.rest.health.care.service.auth.JwtService;
import com.txt.rest.health.care.service.auth.UserInfoService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthFilter extends OncePerRequestFilter {

    private final UserInfoService userDetailsService;
    private final JwtService jwtService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        if (request.getServletPath().contains("swagger-ui")
                || request.getServletPath().contains("swagger-resources")
                || request.getServletPath().contains("v3/api-docs")
                || request.getServletPath().contains("api/v1/auth/generate-token")
                || request.getServletPath().contains("api/v1/heath-care")
                || request.getServletPath().contains("actuator")) {

            filterChain.doFilter(request, response);

        } else {
            String authHeader = request.getHeader(JwtService.AUTHORIZATION);
            String token = null;
            String username = null;

            if (authHeader != null && authHeader.startsWith(JwtService.BEARER)) {
                token = authHeader.substring(7);
                username = jwtService.getUsername(token);
            }

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                if (jwtService.validateToken(token, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
            filterChain.doFilter(request, response);
        }
    }
}
