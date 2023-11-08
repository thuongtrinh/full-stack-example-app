package com.txt.examportal.repository;

import com.txt.examportal.model.exam.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

    @Query("SELECT q FROM Question q WHERE q.qId = :qId")
    List<Question> findByQuizId(Long qId);

}
