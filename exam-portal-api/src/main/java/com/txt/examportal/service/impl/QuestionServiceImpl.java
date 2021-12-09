package com.txt.examportal.service.impl;

import com.txt.examportal.model.exam.Question;
import com.txt.examportal.model.exam.Quiz;
import com.txt.examportal.repository.QuestionRepository;
import com.txt.examportal.repository.QuizRepository;
import com.txt.examportal.service.QuestionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private QuizRepository quizRepository;

    @Override
    public Question addQuestion(Question questionInfo) {
        Question questionlocal = null;
        if(questionInfo.getQuesId() != null){
            questionlocal = questionRepository.findById(questionInfo.getQuesId()).get();
        }

        if (questionlocal != null) {
            log.warn("Question already exists in the database");
            throw new RuntimeException("Question already exists in the database");
        }

        Quiz quiz = quizRepository.getById(questionInfo.getQId());
        if(quiz == null || quiz.getQId() == null){
            throw new RuntimeException("Quiz_id property is null or not exists references in the database");
        }

        questionInfo.setQuiz(quiz);
        Question question = questionRepository.save(questionInfo);

        return question;
    }

    @Override
    public Question updateQuestion(Question question) {
        Question questionLocal = questionRepository.findById(question.getQuesId()).get();

        if(questionLocal == null || questionLocal.getQuesId() == null){
            log.warn("Question not exist in database");
            throw new RuntimeException("Question not exist in database");
        }

        String [] ignore = {"quiz"};
        BeanUtils.copyProperties(question, questionLocal, ignore);
        Question questionUpd = questionRepository.save(questionLocal);
        return questionUpd;
    }

    @Override
    public List<Question> getQuestions() {
        List<Question> questions = questionRepository.findAll();
        return questions;
    }

    @Override
    public List<Question> getQuestionsOfQuiz(Long qId) {
        List<Question> questions = questionRepository.findByQuizId(qId);
        return questions;
    }

    @Override
    public Question getQuestionById(Long quesId) {
        Question question = questionRepository.findById(quesId).get();
        return question;
    }

    @Override
    public void deleteQuestion(Long quesId) {
        questionRepository.deleteById(quesId);
    }
}
