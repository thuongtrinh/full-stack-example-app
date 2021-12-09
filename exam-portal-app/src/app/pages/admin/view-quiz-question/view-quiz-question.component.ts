import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Question } from 'src/app/interfaces/question';
import { Quiz } from 'src/app/interfaces/quiz';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-question',
  templateUrl: './view-quiz-question.component.html',
  styleUrls: ['./view-quiz-question.component.css']
})
export class ViewQuizQuestionComponent implements OnInit {

  qId: number;
  quiz: Quiz;
  questions: Question[];

  constructor(private questionService: QuestionService, private quizService: QuizService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.qId = this.activatedRoute.snapshot.params.qid;

    //Get Quiz
    this.quizService.getQuizzById(this.qId).subscribe({
      next: data => this.quiz =  data.result,
      error: error => console.error(error)
    });

    //Get questions of quiz
    this.activatedRoute.paramMap
      .pipe(
        map(params => params.get('qid')),
        switchMap(qid => this.questionService.getQuestionzesOfQuiz(qid))
      )
      .subscribe({
        next: (data) => (this.questions = data.results),
        error: (error) => {
          console.error(error);
        },
        complete: () => console.log('Complete. Questions by quiz retrieved.'),
      });
  }

  deleteQuestion(quesId: any) {
    Swal.fire({
      position: 'center',
      icon: 'question',
      title: 'Are you sure want to delete ?',
      showConfirmButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      if(result.isConfirmed) {
        this.questionService.deleteQuestion(quesId).subscribe({
          next: data => {
            this.questions =  this.questions.filter(question => question.quesId != quesId);
          },
          error: error => {
            console.error(error);
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Delete question failed',
              showConfirmButton: false,
              timer: 1000
            });
          },
          complete: () => console.log('Complete. Question deleted.')
        });
      }
    });
  }

  updateQuestion() {

  }
}