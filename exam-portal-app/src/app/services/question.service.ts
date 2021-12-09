import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constant } from '../enum/constant.enum';
import { ObjectRespone } from '../interfaces/object-respone';
import { Object2Respone } from '../interfaces/object2-respone';
import { Question } from '../interfaces/question';
import { Quiz } from '../interfaces/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private readonly apiURL = Constant.apiURL;

  constructor(private http: HttpClient) { }

  public getQuestionzes(): Observable<ObjectRespone<Question>>{ 
    return this.http.get<ObjectRespone<Question>>(`${this.apiURL}/question/all`)
  }

  public getQuestionzesOfQuiz(qid: any): Observable<ObjectRespone<Question>>{ 
    return this.http.get<ObjectRespone<Question>>(`${this.apiURL}/question/allOfQuiz/` + qid)
  }

  public getQuestionsTestOfQuiz(qid: any): Observable<Object2Respone<Quiz, Question>>{ 
    return this.http.get<Object2Respone<Quiz, Question>>(`${this.apiURL}/question/allTestOfQuiz/` + qid)
  }

  public addQuestion(data: Question): Observable<ObjectRespone<Question>>{ 
    return this.http.post<ObjectRespone<Question>>(`${this.apiURL}/question/add`, data)
  }

  public deleteQuestion(quesid: number): Observable<ObjectRespone<Question>>{ 
    return this.http.delete<ObjectRespone<Question>>(`${this.apiURL}/question/delete/` + quesid)
  }

  public getQuestionzById(quesid: any): Observable<ObjectRespone<Question>> {
    return this.http.get<ObjectRespone<Question>>(`${this.apiURL}/question/find/` + quesid)
  }

  public updateQuestion(data: Question): Observable<ObjectRespone<Question>> {
    return this.http.put<ObjectRespone<Question>>(`${this.apiURL}/question/update`, data)
  }
}
