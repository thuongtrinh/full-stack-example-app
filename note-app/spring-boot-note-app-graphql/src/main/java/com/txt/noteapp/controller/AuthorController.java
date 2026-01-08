package com.txt.noteapp.controller;

import com.txt.noteapp.model.Author;
import com.txt.noteapp.repository.AuthorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class AuthorController {
    private final AuthorRepository authorRepository;

    // function name needs to match what is defined in the graphql schema
    @QueryMapping
    public Iterable<Author> authors() {
        try {
            List<Author> s = authorRepository.findAll();
            return s;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // @argument annotation, not traditional @PathVariable
    @QueryMapping
    public Optional<Author> authorById(@Argument Long id) {
        return authorRepository.findById(id);
    }

    @MutationMapping
    public Author register(@Argument String name, @Argument Long authorId) {
        Optional<Author> authorOptional = authorRepository.findById(authorId);
        if (authorOptional.isPresent()) {
            throw new IllegalArgumentException("author existed");
        }

        Author author = Author
                .builder()
                .name(name)
                .createdAt(LocalDateTime.now())
                .updateAt(LocalDateTime.now())
                .build();

        return authorRepository.save(author);
    }
}
