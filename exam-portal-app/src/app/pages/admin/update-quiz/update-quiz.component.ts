import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Category } from 'src/app/interfaces/category';
import { Quiz } from 'src/app/interfaces/quiz';
import { CategoryService } from 'src/app/services/category.service';
import { CommonUtils } from 'src/app/services/common-utils.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css'],
})
export class UpdateQuizComponent implements OnInit {
  categories: Category[];
  category: Category;
  quizData: Quiz;

  constructor(
    private quizService: QuizService,
    private snackbar: MatSnackBar,
    private categoryService: CategoryService,
    private _router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        map((params) => params.get('qid')),
        switchMap((qid) => this.quizService.getQuizzById(qid))
      )
      .subscribe({
        next: (data) => (this.quizData = data.result),
        error: (error) => {
          console.error(error);
        },
        complete: () => console.log('Complete. Categories retrieved.'),
      });

    this.categoryService.getCategories().subscribe({
      next: (data) => (this.categories = data.results),
      error: (error) => console.error(error),
    });
  }

  submitUpdateQuiz() {
    if (
      this.quizData.title == undefined ||
      this.quizData.title == null ||
      this.quizData.title.trim() == ''
    ) {
      this.snackbar.open('Title required !!', 'OK', {
        duration: 1000,
      });
      return;
    } else if (
      this.quizData.description == undefined ||
      this.quizData.description == null ||
      this.quizData.description.trim() == ''
    ) {
      this.snackbar.open('Description required !!', 'OK', {
        duration: 1000,
      });
      return;
    } else if (
      this.quizData.maxMarks == null ||
      !CommonUtils.isNumber(this.quizData.maxMarks)
    ) {
      this.snackbar.open('Maximum Marks required must numberic!!', 'OK', {
        duration: 1000,
      });
      return;
    } else if (
      this.quizData.numberOfQuestion == null ||
      !CommonUtils.isNumber(this.quizData.numberOfQuestion)
    ) {
      this.snackbar.open('Number Of Question required must numberic!!', 'OK', {
        duration: 1000,
      });
      return;
    }

    this.quizService.updateQuiz(this.quizData).subscribe({
      next: (data) => {
        this.quizData.title = '';
        this.quizData.description = '';
        this.quizData.maxMarks = '';
        this.quizData.numberOfQuestion = '';

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Quiz is updated successfully',
          showConfirmButton: false,
          timer: 1000,
        }).then((e) => {
          this._router.navigate(['/admin/view-quizzes']);
        });
      },
      error: (error) => {
        console.error(error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Updated Quiz falied',
          showConfirmButton: false,
          timer: 1000,
        });
      },
    });
  }
}
