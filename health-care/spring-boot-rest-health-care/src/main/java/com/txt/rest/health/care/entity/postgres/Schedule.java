package com.txt.rest.health.care.entity.postgres;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "schedule")
@Data
public class Schedule implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "doctor_id")
    private Integer doctorId;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "time_key")
    private String timeKey;

    @Column(name = "current_number")
    private Integer currentNumber;

    @Column(name = "max_number")
    private Integer maxNumber;

    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @Column(name = "updated_date")
    private LocalDateTime updatedDate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumns({
            @JoinColumn(name = "time_key", nullable = true, insertable = false, updatable = false),
    })
    private AllCode allCodeTime;
}
