package com.txt.rest.health.care.config;

import com.txt.rest.health.care.filter.JwtAuthFilter;
import com.txt.rest.health.care.service.auth.UserInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final UserInfoService userDetailsService;
    private final JwtAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors(httpSecurityCorsConfigurer -> {
            CorsConfiguration configuration = new CorsConfiguration();
            configuration.setAllowedOrigins(Arrays.asList("*"));
            configuration.setAllowedMethods(Arrays.asList("*"));
            configuration.setAllowedHeaders(Arrays.asList("*"));
            UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
            source.registerCorsConfiguration("/**", configuration);
            httpSecurityCorsConfigurer.configurationSource(source);
        });

        // Disable CSRF for simplicity in some cases, or configure it appropriately
        http.csrf(AbstractHttpConfigurer::disable); //http.csrf(csrf -> csrf.disable());

        // Stateless session (required for JWT)
        http.sessionManagement(c -> c.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        // Configure endpoint authorization
        http.authorizeHttpRequests(authorize -> authorize
                .requestMatchers(
                        "/swagger-resources/**",
                        "/swagger-ui/**",
                        "/swagger-ui.html",
                        "/v3/api-docs/**",
                        "/actuator/**",
                        "api/v1/auth/generate-token",
                        "/api/v1/heath-care/**"
                        )
                .permitAll()
                .anyRequest().authenticated());

        // Set custom authentication provider
        http.authenticationProvider(authenticationProvider());

        // Add JWT filter before Spring Security's default filter
        http.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    /*
     * Password encoder bean (uses BCrypt hashing)
     * Critical for secure password storage
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /*
     * Authentication provider configuration
     * Links UserDetailsService and PasswordEncoder
     */
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    /*
     * Authentication manager bean
     * Required for programmatic authentication (e.g., in /generateToken)
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
