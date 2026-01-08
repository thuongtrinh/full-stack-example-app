package com.txt.noteapp.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Folder {

    @Id
    @GeneratedValue
    Long id;

    String name;

    LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    Author author;

    @OneToMany(mappedBy = "folder", cascade = CascadeType.ALL)
    List<Note> notes = new ArrayList<>();
}
