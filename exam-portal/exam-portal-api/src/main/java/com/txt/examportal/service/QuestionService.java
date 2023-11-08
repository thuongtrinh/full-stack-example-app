package com.txt.examportal.service;

import com.txt.examportal.model.exam.Question;

import java.util.List;

public interface QuestionService {

    Question addQuestion(Question question);

    Question updateQuestion(Question question);

    List<Question> getQuestions();

    List<Question> getQuestionsOfQuiz(Long qId);

    Question getQuestionById(Long questionId);

    void deleteQuestion(Long questionId);
}
