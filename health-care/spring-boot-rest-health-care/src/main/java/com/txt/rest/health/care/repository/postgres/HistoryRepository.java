package com.txt.rest.health.care.repository.postgres;

import com.txt.rest.health.care.entity.postgres.History;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoryRepository extends CrudRepository<History, Long> {
}
