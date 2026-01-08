package com.txt.noteapp.config;

import com.txt.noteapp.model.Author;
import com.txt.noteapp.model.Folder;
import com.txt.noteapp.model.Note;
import com.txt.noteapp.repository.AuthorRepository;
import com.txt.noteapp.repository.FolderRepository;
import com.txt.noteapp.repository.NoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class SeedDataConfig implements CommandLineRunner {

    private final AuthorRepository authorRepository;
    private final NoteRepository noteRepository;
    private final FolderRepository folderRepository;

    @Override
    public void run(String... args) throws Exception {

        if (authorRepository.count() == 0) {
            Author author1 = Author.builder()
                    .name("Folder 1")
                    .createdAt(LocalDateTime.now())
                    .build();

            author1 = authorRepository.save(author1);

            Folder folder1 = Folder.builder()
                    .name("Folder 1")
                    .createdAt(LocalDateTime.now())
                    .author(author1)
                    .build();

            Folder folder2 = Folder.builder()
                    .name("Folder 2")
                    .createdAt(LocalDateTime.now())
                    .author(author1)
                    .build();

            folderRepository.save(folder1);
            folderRepository.save(folder2);

            Note note1 = Note.builder()
                    .content("great Note")
                    .folder(folder1)
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();

            Note note2 = Note.builder()
                    .content("good Note")
                    .folder(folder2)
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();

            noteRepository.save(note1);
            noteRepository.save(note2);

        }
    }

}
