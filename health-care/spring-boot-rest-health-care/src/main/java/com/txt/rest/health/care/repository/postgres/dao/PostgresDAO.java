package com.txt.rest.health.care.repository.postgres.dao;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class PostgresDAO {
    @Qualifier("entityManagerFactory")
    private final LocalContainerEntityManagerFactoryBean entityManagerFactoryBean;

    @PersistenceContext(unitName = "eUnit")
    @Qualifier("entityManagerFactory")
    private EntityManager entityManager;

}
