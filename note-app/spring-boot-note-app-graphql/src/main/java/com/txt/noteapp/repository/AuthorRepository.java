package com.txt.noteapp.repository;

import com.txt.noteapp.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuthorRepository extends JpaRepository<Author, Long> {
    Optional<Author> findByUid(String uid);
}
