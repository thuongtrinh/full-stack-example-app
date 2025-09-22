package com.txt.rest.health.care.entity.postgres;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "markdown")
@Data
public class Markdown implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "doctor_id")
    private Long doctorId;

    @Column(name = "clinic_id")
    private Long clinicId;

    @Column(name = "speciality_id")
    private Long specialityId;

    @Column(name = "content_html")
    private String contentHtml;

    @Column(name = "content_markdown")
    private String contentMarkdown;

    @Column(name = "description")
    private String description;

    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @Column(name = "updated_date")
    private LocalDateTime updatedDate;
}
