package com.txt.rest.health.care.repository.postgres;

import com.txt.rest.health.care.entity.postgres.Clinic;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClinicRepository extends CrudRepository<Clinic, Long> {
}
