package com.txt.rest.health.care.repository.postgres;

import com.txt.rest.health.care.entity.postgres.AllCode;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AllCodeRepository extends CrudRepository<AllCode, String> {
    List<AllCode> findByType(String type);

    List<AllCode> findByKey(String key);

    List<AllCode> findByTypeInOrderByKey(List<String> type);

    AllCode findFirstByTypeAndKey(String type, String key);

}
