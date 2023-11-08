package com.txt.examportal.service;

import com.txt.examportal.model.exam.Quiz;

import java.util.List;

public interface QuizService {

    Quiz addQuiz(Quiz quiz);

    Quiz updateQuiz(Quiz quiz);

    List<Quiz> getQuizzes();

    Quiz getQuizById(Long quizId);

    List<Quiz> getQuizzesOfCategory(Long categoryId);

    void deleteQuiz(Long quizId);
}
