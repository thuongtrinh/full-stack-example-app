package com.txt.rest.health.care.entity.postgres;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "booking")
@Data
public class Booking implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "doctor_id")
    private Long doctorId;

    @Column(name = "patient_id")
    private Long patientId;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "status_key")
    private String statusKey;

    @Column(name = "time_key")
    private String timeKey;

    @Column(name = "token")
    private String token;

//    @Column(name = "reason")
//    private String reason;

    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @Column(name = "updated_date")
    private LocalDateTime updatedDate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumns({
            @JoinColumn(name = "doctor_id", nullable = true, insertable = false, updatable = false),
    })
    private Users userDoctor;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumns({
            @JoinColumn(name = "patient_id", nullable = true, insertable = false, updatable = false),
    })
    private Users userPatient;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumns({
            @JoinColumn(name = "time_key", nullable = true, insertable = false, updatable = false),
    })
    private AllCode allCodeTime;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumns({
            @JoinColumn(name = "status_key", nullable = true, insertable = false, updatable = false),
    })
    private AllCode allCodeStatus;
}
