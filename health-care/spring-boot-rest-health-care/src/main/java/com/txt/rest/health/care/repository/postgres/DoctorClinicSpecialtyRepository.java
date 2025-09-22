package com.txt.rest.health.care.repository.postgres;

import com.txt.rest.health.care.entity.postgres.DoctorClinicSpecialty;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorClinicSpecialtyRepository extends CrudRepository<DoctorClinicSpecialty, Long> {
}
