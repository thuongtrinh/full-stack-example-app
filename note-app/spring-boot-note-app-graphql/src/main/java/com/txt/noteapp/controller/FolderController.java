package com.txt.noteapp.controller;

import com.txt.noteapp.model.Author;
import com.txt.noteapp.model.Folder;
import com.txt.noteapp.repository.FolderRepository;
import com.txt.noteapp.service.AuthorService;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class FolderController {
    private final FolderRepository folderRepository;
    private final AuthorService authorService;

    @QueryMapping
    public Iterable<Folder> folders() {
        return folderRepository.findAll();
    }

    @QueryMapping
    public Optional<Folder> folderById(@Argument Long id) {
        return folderRepository.findById(id);
    }

    @MutationMapping
    public Folder createFolder(@Argument String name, @Argument String authorId) {
        if (Objects.isNull(authorId) || Objects.isNull(name)) {
            throw new IllegalArgumentException("author not found");
        }
        Author author = authorService.getAuthor(authorId);

        Folder article = Folder
                .builder()
                .name(name)
                .author(author)
                .createdAt(LocalDateTime.now())
                .build();

        return folderRepository.save(article);
    }

//    @MutationMapping
//    public void deleteFolder(@Argument Long id) {
//        noteRepository.findAllById()
//        folderRepository.deleteById(id);
//    }
}
