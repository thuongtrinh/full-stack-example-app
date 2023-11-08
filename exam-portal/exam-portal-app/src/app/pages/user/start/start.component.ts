import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/interfaces/question';
import { Quiz } from 'src/app/interfaces/quiz';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  qid: number;
  quiz: Quiz;
  questions: Question[];

  isSubmited = false;
  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;
  timer: any;
  timerInterval: any;

  constructor(private locationSt: LocationStrategy, private activatedRoute: ActivatedRoute, private questionService: QuestionService) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this.activatedRoute.snapshot.params.qid;
    this.loadQuestion();
  }

  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, null, location.href);
    });
  }

  loadQuestion() {
    this.questionService.getQuestionsTestOfQuiz(this.qid).subscribe({
      next: (data) => {
        this.quiz = data.result;
        this.questions = data.results;

        this.timer = this.questions.length * 2 * 60;

        this.questions.forEach(q => {
          q.givenAnswer = null;
        })
        console.log(this.questions);
        this.startTimer();
      },
      error: (error) => console.error(error)
    });
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon: 'info'
    }).then(e => {
      if(e.isConfirmed) {
        clearInterval( this.timerInterval)
        this.evalQuiz();
      }
    });
  }

  startTimer() {
    this.timerInterval = window.setInterval(() => {
      //code
      if(this.timer <= 0) {
        this.evalQuiz();
        clearInterval( this.timerInterval);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm *60;

    if(this.isSubmited) {
      return `0 min : 0 sec`
    } else {
      return `${mm} min : ${ss} sec`
    }
  }

  evalQuiz() {
    this.isSubmited = true;
    this.correctAnswers = 0;
    this.questions.forEach(q => {
      if(q.answer == q.givenAnswer){
        this.correctAnswers++;
      }
      this.attempted = this.questions?.length;
      this.marksGot = this.correctAnswers / this.attempted * 10;
      this.marksGot = parseFloat(Number(this.marksGot).toFixed(2));
    });
  }
}


