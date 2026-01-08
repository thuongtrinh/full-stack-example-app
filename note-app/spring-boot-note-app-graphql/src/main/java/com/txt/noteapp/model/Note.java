package com.txt.noteapp.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Entity
@Data
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Note {

    @Id
    @GeneratedValue
    Long id;

    String content;

    LocalDateTime createdAt;

    LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    Folder folder;

}
