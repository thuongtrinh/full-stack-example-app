package com.txt.noteapp.service;

import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.UserRecord;
import com.txt.noteapp.dto.auth.UserDTO;
import com.txt.noteapp.model.Author;
import com.txt.noteapp.repository.AuthorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class AuthorService {
    private static final Pattern INT_PATTERN = Pattern.compile("^-?\\d+$");
    private final AuthorRepository authorRepository;

    public Author saveFirstLoginSSO(FirebaseToken firebaseToken, UserRecord userRecord) {
        Author author = new Author();
        author.setEmail(firebaseToken.getEmail());
        author.setName(firebaseToken.getName());
        author.setUid(firebaseToken.getUid());
        author.setCreatedAt(LocalDateTime.now());
        author.setUpdateAt(LocalDateTime.now());
        author.setLastLogin(LocalDateTime.ofEpochSecond(userRecord.getUserMetadata().getLastSignInTimestamp(), 0, ZoneOffset.UTC));
        Author savedAuthor = authorRepository.save(author);
        return savedAuthor;
    }

    public Author save(UserDTO userDTO) {
        Optional<Author> authorOptional = authorRepository.findByUid(userDTO.getUid());
        Author author;
        if (authorOptional.isEmpty()) {
            author = new Author();
            author.setEmail(userDTO.getEmail());
            author.setName(userDTO.getDisplayName());
            author.setUid(userDTO.getUid());
            author.setCreatedAt(LocalDateTime.now());
            author.setUpdateAt(LocalDateTime.now());
            author.setLastLogin(LocalDateTime.now());
        } else {
            author = authorOptional.get();
            author.setName(userDTO.getDisplayName());
            author.setUpdateAt(LocalDateTime.now());
        }
        Author savedUserInfo = authorRepository.save(author);
        return savedUserInfo;
    }

    public Author getAuthor(String authorId) {
        Author author;
        if (isNumber(authorId)) {
            author = authorRepository.findById(Long.parseLong(authorId)).orElseThrow(() -> new IllegalArgumentException("author not found"));
        } else {
            author = authorRepository.findByUid(authorId).orElseThrow(() -> new IllegalArgumentException("author not found"));
        }
        return author;
    }

    public static boolean isNumber(String str) {
        if (str == null || str.isEmpty()) return false;
        return INT_PATTERN.matcher(str).matches();
    }

}
