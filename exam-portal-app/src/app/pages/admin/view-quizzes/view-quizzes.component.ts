import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/app/interfaces/quiz';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes : Quiz[];

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.quizService.getQuizzes().subscribe({
      next: data => this.quizzes =  data.results,
      error: error => {
        console.error(error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Get all quizzes falied',
          showConfirmButton: false,
          timer: 1000
        });
      },
      complete: () => console.log('Complete. Quizzes retrieved.')
    });
  }

  deleteQuiz(qId: number) {
    Swal.fire({
      position: 'center',
      icon: 'question',
      title: 'Are you sure want to delete ?',
      showConfirmButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      if(result.isConfirmed) {
        this.quizService.deleteQuiz(qId).subscribe({
          next: data => {
            this.quizzes =  this.quizzes.filter(quiz => quiz.qid != qId);
          },
          error: error => {
            console.error(error);
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Delete quiz failed',
              showConfirmButton: false,
              timer: 1000
            });
          },
          complete: () => console.log('Complete. Quiz deleted.')
        });
      }
    });
  }

}
