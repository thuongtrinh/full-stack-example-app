package com.txt.rest.health.care.repository.postgres;

import com.txt.rest.health.care.entity.postgres.Speciality;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpecialityRepository extends CrudRepository<Speciality, Long> {
}
