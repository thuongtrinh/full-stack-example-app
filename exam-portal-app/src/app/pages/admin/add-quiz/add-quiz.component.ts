import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from 'src/app/interfaces/category';
import { Quiz } from 'src/app/interfaces/quiz';
import { CategoryService } from 'src/app/services/category.service';
import { CommonUtils } from 'src/app/services/common-utils.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories: Category[];
  selectedCategory: string;

  quizData: Quiz = {
    cid: null,
    title: '',
    description: '',
    qid: null,
    maxMarks: '',
    numberOfQuestion: '',
    active: true,
    category: null
  };

  constructor(private quizService: QuizService, private snackbar: MatSnackBar, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: data => this.categories =  data.results,
      error: error => {
        console.error(error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Get all categories falied',
          showConfirmButton: false,
          timer: 1000
        });
      },
      complete: () => console.log('Complete. Categories retrieved.')
    });
  }

  submitAddQuiz() {
    if(this.quizData.title == undefined || this.quizData.title == null || this.quizData.title.trim() == '') {
      this.snackbar.open('Title required !!', 'OK', {
        duration: 1000
      });
      return;
    } else if(this.quizData.description == undefined || this.quizData.description == null || this.quizData.description.trim() == '') {
      this.snackbar.open('Description required !!', 'OK', {
        duration: 1000
      });
      return;
    } else if(this.quizData.maxMarks == null || !CommonUtils.isNumber(this.quizData.maxMarks)) {
      this.snackbar.open('Maximum Marks required must numberic!!', 'OK', {
        duration: 1000
      });
      return;
    } else if(this.quizData.numberOfQuestion == null || !CommonUtils.isNumber(this.quizData.numberOfQuestion)) {
      this.snackbar.open('Number Of Question required must numberic!!', 'OK', {
        duration: 1000
      });
      return;
    }

    this.quizService.addQuiz(this.quizData).subscribe({
      next: data => {
        this.quizData.title = '';
        this.quizData.description = '';
        this.quizData.maxMarks = '';
        this.quizData.numberOfQuestion = '';

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Quiz is added successfully',
          showConfirmButton: false,
          timer: 1000
        });
      },
      error: error => {
        console.error(error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Add Quiz falied',
          showConfirmButton: false,
          timer: 1000
        });
      },
      complete: () => console.log('Complete. Add new Quiz.')
    });
  }

}
