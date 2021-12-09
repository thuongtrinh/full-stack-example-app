package com.txt.examportal.repository;

import com.txt.examportal.model.exam.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {

    Quiz findByTitle(String title);

    @Query("SELECT q FROM Quiz q WHERE q.cId = :cId")
    List<Quiz> findByCategoryId(Long cId);
}
