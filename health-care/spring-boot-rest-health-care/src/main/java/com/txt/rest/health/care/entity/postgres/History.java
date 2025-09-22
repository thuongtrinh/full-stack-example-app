package com.txt.rest.health.care.entity.postgres;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "history")
@Data
public class History implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "patient_key")
    private Integer patientKey;

    @Column(name = "doctor_key")
    private Integer doctorKey;

    @Column(name = "description")
    private String description;

    @Column(name = "files")
    private String files;

    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @Column(name = "updated_date")
    private LocalDateTime updatedDate;
}
