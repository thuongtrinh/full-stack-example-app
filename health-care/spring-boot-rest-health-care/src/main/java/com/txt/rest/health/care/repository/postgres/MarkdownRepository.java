package com.txt.rest.health.care.repository.postgres;

import com.txt.rest.health.care.entity.postgres.Markdown;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarkdownRepository extends CrudRepository<Markdown, Long> {
    Markdown findFirstByDoctorId(Long doctorId);
}

