package com.txt.examportal.controller;

import com.txt.examportal.dto.response.Response;
import com.txt.examportal.model.exam.Question;
import com.txt.examportal.model.exam.Quiz;
import com.txt.examportal.service.impl.QuestionServiceImpl;
import com.txt.examportal.service.impl.QuizServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

@Controller
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    private QuestionServiceImpl questionService;

    @Autowired
    private QuizServiceImpl quizService;

    @GetMapping("/all")
    public ResponseEntity<Response> getAllQuestions() {
        List<Question> questions = questionService.getQuestions();
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(LocalDateTime.now())
                        .results(questions)
                        .message("Questions retrieved")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }

    @GetMapping("/allOfQuiz/{id}")
    public ResponseEntity<Response> getAllQuestionsOfQuiz(@PathVariable("id") Long qId) {
        List<Question> questions = questionService.getQuestionsOfQuiz(qId);
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(LocalDateTime.now())
                        .results(questions)
                        .message("Questions of Quiz retrieved")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }

    @GetMapping("/allTestOfQuiz/{id}")
    public ResponseEntity<Response> getAllQuestionsTestOfQuiz(@PathVariable("id") Long qId) {
        Quiz quiz = quizService.getQuizById(qId);
        Set<Question> questions = quiz.getQuestions();
        List<Question> list = new ArrayList<>(questions);

        if(list.size() > Integer.parseInt(quiz.getNumberOfQuestion())) {
            list = list.subList(0, Integer.parseInt(quiz.getNumberOfQuestion()) + 1);
        }
        Collections.shuffle(list);

        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(LocalDateTime.now())
                        .results(list)
                        .result(quiz)
                        .message("Questions of Quiz retrieved")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Response> getQuestionById(@PathVariable("id") Long id) {
        Question question = questionService.getQuestionById(id);

        if (question == null) {
            return ResponseEntity.ok(
                    Response.builder()
                            .timeStamp(LocalDateTime.now())
                            .message("Question not found")
                            .status(HttpStatus.NOT_FOUND)
                            .statusCode(HttpStatus.NOT_FOUND.value())
                            .build()
            );
        }

        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(LocalDateTime.now())
                        .result(question)
                        .message("Question retrieved")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }

    @PostMapping("/add")
    public ResponseEntity<Response> addQuestion(@RequestBody Question questionInp) {
        Question question = questionService.addQuestion(questionInp);

        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(LocalDateTime.now())
                        .result(question)
                        .message("Question created")
                        .status(HttpStatus.CREATED)
                        .statusCode(HttpStatus.CREATED.value())
                        .build()
        );
    }

    @PutMapping("/update")
    public ResponseEntity<Response> updateQuestion(@RequestBody Question question) {
        Question questionUpd = questionService.updateQuestion(question);

        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(LocalDateTime.now())
                        .result(questionUpd)
                        .message("Question updated")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteQuestion(@PathVariable("id") Long id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(LocalDateTime.now())
                        .message("Question deleted")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }

}
