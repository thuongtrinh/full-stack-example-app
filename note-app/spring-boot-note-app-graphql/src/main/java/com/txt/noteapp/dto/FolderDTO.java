package com.txt.noteapp.dto;

import com.txt.noteapp.model.Author;
import com.txt.noteapp.model.Note;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Data
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FolderDTO {
    private Long id;
    private String name;
    private LocalDateTime createdAt;
    private Author author;
    private List<Note> notes = new ArrayList<>();
}
