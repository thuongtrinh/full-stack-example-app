package com.txt.rest.health.care.repository.postgres;

import com.txt.rest.health.care.entity.postgres.Users;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends CrudRepository<Users, Long>, QuerydslPredicateExecutor<Users> {
    Users findByEmail(String email);
}
