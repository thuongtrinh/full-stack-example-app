import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Question } from 'src/app/interfaces/question';
import { Quiz } from 'src/app/interfaces/quiz';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {
  public Editor = ClassicEditor;

  qId: number;
  quesId: number;
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
    this.quesId = this.activatedRoute.snapshot.params.quesid;

    this.quizService.getQuizzes().subscribe({
      next: (data) => {
        this.quizzes = data.results;
      },
      error: (error) => console.error(error),
    });

    this.questionService.getQuestionzById(this.quesId).subscribe({
      next: data => this.questionData =  data.result,
      error: error => {
        console.error(error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Get all question falied',
          showConfirmButton: false,
          timer: 1000
        });
      },
      complete: () => console.log('Complete. Question retrieved.')
    });
  }

  submitUpdateQuestion() {
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

    this.questionService.updateQuestion(this.questionData).subscribe({
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
          title: 'Question updated successfully',
          showConfirmButton: false,
          timer: 1000,
        });
      },
      error: (error) => {
        console.error(error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Update Question falied',
          showConfirmButton: false,
          timer: 1000,
        });
      },
      complete: () => console.log('Complete. Update new Question.'),
    });
  }

}
