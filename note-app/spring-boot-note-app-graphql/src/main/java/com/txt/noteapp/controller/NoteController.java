package com.txt.noteapp.controller;

import com.txt.noteapp.dto.request.NoteInput;
import com.txt.noteapp.model.Folder;
import com.txt.noteapp.model.Note;
import com.txt.noteapp.repository.FolderRepository;
import com.txt.noteapp.repository.NoteRepository;
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
public class NoteController {
    private final NoteRepository noteRepository;
    private final FolderRepository folderRepository;
    private final AuthorService authorService;


    @QueryMapping
    public Optional<Note> noteById(@Argument Long id) {
        return noteRepository.findById(id);
    }

    @MutationMapping
    public Note addNote(@Argument(name = "note") NoteInput noteInput) {
        Folder folder = folderRepository.findById(Long.parseLong(noteInput.getFolderId())).orElseThrow(() -> new IllegalArgumentException("folder not found"));
        if (Objects.isNull(noteInput.getAuthorId())) {
            throw new IllegalArgumentException("author not found");
        }
        String authorId = noteInput.getAuthorId();
        authorService.getAuthor(authorId);

        Note note = Note
                .builder()
                .folder(folder)
                .content(noteInput.getContent())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return noteRepository.save(note);
    }

    @MutationMapping
    public Note updateNote(@Argument Long id, @Argument(name = "note") NoteInput noteInput) {
        Note note = noteRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("note not found"));
        String authorId = noteInput.getAuthorId();
        authorService.getAuthor(authorId);

        note.setContent(noteInput.getContent());
        note.setUpdatedAt(LocalDateTime.now());
        return noteRepository.save(note);
    }
}
