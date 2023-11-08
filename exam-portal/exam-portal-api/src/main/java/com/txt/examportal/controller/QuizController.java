package com.txt.examportal.controller;

import com.txt.examportal.dto.response.Response;
import com.txt.examportal.model.exam.Quiz;
import com.txt.examportal.service.impl.QuizServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@Controller
@RequestMapping("/quiz")
public class QuizController {

    @Autowired
    private QuizServiceImpl quizService;

    @GetMapping("/all")
    public ResponseEntity<Response> getAllQuizzes() {
        List<Quiz> quizzes = quizService.getQuizzes();
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(LocalDateTime.now())
                        .results(quizzes)
                        .message("Quizzes retrieved")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }

    @GetMapping("/allOfCategory/{id}")
    public ResponseEntity<Response> getAllQuizzesOfCategory(@PathVariable("id") Long cId) {
        List<Quiz> quizzes = quizService.getQuizzesOfCategory(cId);
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(LocalDateTime.now())
                        .results(quizzes)
                        .message("Quizzes of Category retrieved")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Response> getQuizById(@PathVariable("id") Long id) {
        Quiz quiz = quizService.getQuizById(id);

        if (quiz == null) {
            return ResponseEntity.ok(
                    Response.builder()
                            .timeStamp(LocalDateTime.now())
                            .message("Quiz not found")
                            .status(HttpStatus.NOT_FOUND)
                            .statusCode(HttpStatus.NOT_FOUND.value())
                            .build()
            );
        }

        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(LocalDateTime.now())
                        .result(quiz)
                        .message("Quiz retrieved")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }

    @PostMapping("/add")
    public ResponseEntity<Response> addQuiz(@RequestBody Quiz quizInp) {
        Quiz quiz = quizService.addQuiz(quizInp);

        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(LocalDateTime.now())
                        .result(quiz)
                        .message("Quiz created")
                        .status(HttpStatus.CREATED)
                        .statusCode(HttpStatus.CREATED.value())
                        .build()
        );
    }

    @PutMapping("/update")
    public ResponseEntity<Response> updateQuiz(@RequestBody Quiz quiz) {
        Quiz quizUpd = quizService.updateQuiz(quiz);

        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(LocalDateTime.now())
                        .result(quizUpd)
                        .message("Quiz updated")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteQuiz(@PathVariable("id") Long id) {
        quizService.deleteQuiz(id);
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(LocalDateTime.now())
                        .message("Quiz deleted")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }

}
