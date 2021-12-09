package com.txt.examportal.service.impl;

import com.txt.examportal.model.exam.Category;
import com.txt.examportal.model.exam.Quiz;
import com.txt.examportal.repository.CategoryRepository;
import com.txt.examportal.repository.QuizRepository;
import com.txt.examportal.service.QuizService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class QuizServiceImpl implements QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Quiz addQuiz(Quiz quizInfo) {
        Quiz quizlocal = quizRepository.findByTitle(quizInfo.getTitle());

        if (quizlocal != null) {
            log.warn("Quiz already exists in the database");
            throw new RuntimeException("Quiz already exists in the database");
        }

        Category category = categoryRepository.getById(quizInfo.getCId());
        if(category == null || category.getCId() == null){
            throw new RuntimeException("Category_id property is null or not exists references in the database");
        }

        quizInfo.setCategory(category);
        Quiz quiz = quizRepository.save(quizInfo);

        return quiz;
    }

    @Override
    public Quiz updateQuiz(Quiz quiz) {
        Quiz quizLocal = quizRepository.findById(quiz.getQId()).get();

        if(quizLocal == null || quizLocal.getQId() == null){
            log.warn("Quiz not exist in database");
            throw new RuntimeException("Quiz not exist in database");
        }

        String [] ignore = {"qId", "category", "questions"};
        BeanUtils.copyProperties(quiz, quizLocal, ignore);
        Quiz quizUpd = quizRepository.save(quizLocal);
        return quizUpd;
    }

    @Override
    public List<Quiz> getQuizzes() {
        List<Quiz> quizzes = quizRepository.findAll();
        return quizzes;
    }

    @Override
    public List<Quiz> getQuizzesOfCategory(Long categoryId) {
        List<Quiz> quizzes = quizRepository.findByCategoryId(categoryId);
        return quizzes;
    }

    @Override
    public Quiz getQuizById(Long quizId) {
        Quiz quiz = quizRepository.findById(quizId).get();
        return quiz;
    }

    @Override
    public void deleteQuiz(Long quizId) {
        quizRepository.deleteById(quizId);
    }
}
