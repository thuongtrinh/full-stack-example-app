package com.txt.rest.health.care.entity.postgres;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;

@Entity
@Table(name = "doctor_clinic_specialty")
@Data
public class DoctorClinicSpecialty implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "doctor_key")
    private Long doctorKey;

    @Column(name = "clinic_key")
    private Long clinicKey;

    @Column(name = "speciality_key")
    private Long specialityKey;
}
