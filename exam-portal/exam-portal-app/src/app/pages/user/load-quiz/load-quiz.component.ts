import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Quiz } from 'src/app/interfaces/quiz';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css'],
})
export class LoadQuizComponent implements OnInit {
  catid: number;
  quizzes: Quiz[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    //this.catid = this.activatedRoute.snapshot.params.catid;
    
    this.activatedRoute.params.subscribe(params => {
      this.catid = params.catid;

      if (this.catid == null || this.catid == undefined || this.catid == 0) {
        this.quizService.getQuizzes().subscribe({
          next: (data) => (this.quizzes = data.results),
          error: (error) => console.error(error),
        });
      } else {
        this.quizService.getQuizzesOfCategory(this.catid).subscribe({
          next: (data) => (this.quizzes = data.results),
          error: (error) => console.error(error),
        });
      }
    })
  }

  startQuiz(qid: any) {
    Swal.fire({
      title: 'Do you want to start quiz?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
         this.router.navigate(['/start/' + qid]);
      }
    })
  }

}
