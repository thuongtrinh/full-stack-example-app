package com.txt.noteapp.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.UserRecord;
import com.txt.noteapp.dto.auth.UserDTO;
import com.txt.noteapp.model.Author;
import com.txt.noteapp.repository.AuthorRepository;
import com.txt.noteapp.service.AuthorService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.security.Principal;
import java.util.Optional;

@Component
@Slf4j
@RequiredArgsConstructor
public class FirebaseAuthenticationFilter extends OncePerRequestFilter {

    private final AuthorRepository authorRepository;
    private final AuthorService authorService;
    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        if (request.getServletPath().contains("swagger-ui")
                || request.getServletPath().contains("swagger-resources")
                || request.getServletPath().contains("v3/api-docs")
                || request.getServletPath().contains("api/get-token")
                || request.getServletPath().contains("actuator")) {

            filterChain.doFilter(request, response);

        } else {
            try {
                String header = request.getHeader("Authorization");
                if (header == null || !header.startsWith("Bearer ")) {
                    filterChain.doFilter(request, response);
                    return;
                }

                String token = header.substring(7);

                FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
                System.out.println("decodedToken" + mapper.writeValueAsString(decodedToken));
                String uid = decodedToken.getUid();

                UserRecord userRecord = FirebaseAuth.getInstance().getUser(decodedToken.getUid());
                System.out.println("userRecord" + mapper.writeValueAsString(userRecord));

                Optional<Author> author = authorRepository.findByUid(uid);
                if (author.isEmpty()) {
                    authorService.saveFirstLoginSSO(decodedToken, userRecord);
                    log.info("Login new useInfo decodedToken: {}", decodedToken);
                } else {
                    log.info("update useInfo: {}", decodedToken.getEmail());
                    UserDTO userDTO = new UserDTO();
                    userDTO.setDisplayName(userRecord.getDisplayName());
                    userDTO.setUid(author.get().getUid());
                    authorService.save(userDTO);
                }

//                List<String> roles = user.get().getRoles().stream().map(Role::getRoleName).toList();
//                List<GrantedAuthority> authorities = roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
                Principal principal = () -> uid;
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(principal, userRecord.getEmail(), null);

                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);

            } catch (FirebaseAuthException e) {
                log.error(e.getMessage(), e);
            }

            filterChain.doFilter(request, response);
        }
    }
}