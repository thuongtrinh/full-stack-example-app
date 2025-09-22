package com.txt.rest.health.care.repository.postgres;

import com.txt.rest.health.care.entity.postgres.Doctor;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorRepository extends CrudRepository<Doctor, Long>, QuerydslPredicateExecutor<Doctor> {
    Doctor findFirstByDoctorId(Long doctorId);
}
