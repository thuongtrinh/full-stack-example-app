import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Question } from 'src/app/interfaces/question';
import { Quiz } from 'src/app/interfaces/quiz';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
})
export class AddQuestionComponent implements OnInit {
  public Editor = ClassicEditor;

  qId: number;
  quizzes: Quiz[];
  selectedQuiz: string;

  questionData: Question = {
    quesId: null,
    qid: null,
    answer: '',
    content: '',
    image: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
  };

  constructor(
    private snackbar: MatSnackBar,
    private quizService: QuizService,
    private questionService: QuestionService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.qId = this.activatedRoute.snapshot.params.qid;

    this.quizService.getQuizzes().subscribe({
      next: (data) => {
        this.quizzes = data.results;
        let quizTitle = this.quizzes.filter((s) => s.qid == this.qId).map((quiz) => quiz.title);
        this.selectedQuiz = quizTitle.toString();
      },
      error: (error) => console.error(error),
    });
  }

  selectionChangeQuiz(ob) {
    let selectedQuizId = ob.value;
    let quizTitle = this.quizzes.filter((s) => s.qid === selectedQuizId).map((quiz) => quiz.title);
    this.selectedQuiz = quizTitle.toString();
  }

  submitAddQuestion() {
    if (this.questionData.qid == null || this.questionData.qid == undefined) {
      this.snackbar.open('Quiz required !!', 'OK', {
        duration: 1000,
      });
      return;
    } else if (this.questionData.content == null || this.questionData.content.trim() == '') {
      this.snackbar.open('Content required !!', 'OK', {
        duration: 1000,
      });
      return;
    } else if (this.questionData.option1 == null || this.questionData.option1.trim() == '') {
      this.snackbar.open('Option 1 required !!', 'OK', {
        duration: 1000,
      });
      return;
    } else if (this.questionData.option2 == null || this.questionData.option2.trim() == '') {
      this.snackbar.open('Option 2 required !!', 'OK', {
        duration: 1000,
      });
      return;
    } else if (this.questionData.option3 == null || this.questionData.option3.trim() == '') {
      this.snackbar.open('Option 3 required !!', 'OK', {
        duration: 1000,
      });
      return;
    } else if (this.questionData.option4 == null || this.questionData.option4.trim() == '') {
      this.snackbar.open('Option 4 required !!', 'OK', {
        duration: 1000,
      });
      return;
    } else if (this.questionData.answer == null || this.questionData.answer.trim() == '') {
      this.snackbar.open('Answer required !!', 'OK', {
        duration: 1000,
      });
      return;
    }

    this.questionService.addQuestion(this.questionData).subscribe({
      next: (data) => {
        this.questionData.content = '';
        this.questionData.option1 = '';
        this.questionData.option2 = '';
        this.questionData.option3 = '';
        this.questionData.option4 = '';
        this.questionData.qid = null;
        this.questionData.answer = '';

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Question is added successfully',
          showConfirmButton: false,
          timer: 1000,
        });
      },
      error: (error) => {
        console.error(error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Add Question falied',
          showConfirmButton: false,
          timer: 1000,
        });
      },
      complete: () => console.log('Complete. Add new Question.'),
    });
  }

}
