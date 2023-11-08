import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constant } from '../enum/constant.enum';
import { ObjectRespone } from '../interfaces/object-respone';
import { Quiz } from '../interfaces/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private readonly apiURL = Constant.apiURL;

  constructor(private http: HttpClient) { }

  public getQuizzes(): Observable<ObjectRespone<Quiz>>{ 
    return this.http.get<ObjectRespone<Quiz>>(`${this.apiURL}/quiz/all`)
  }

  public addQuiz(data: Quiz): Observable<ObjectRespone<Quiz>>{ 
    return this.http.post<ObjectRespone<Quiz>>(`${this.apiURL}/quiz/add`, data)
  }

  public deleteQuiz(qid: number): Observable<ObjectRespone<Quiz>>{ 
    return this.http.delete<ObjectRespone<Quiz>>(`${this.apiURL}/quiz/delete/` + qid)
  }

  public getQuizzById(qid: any): Observable<ObjectRespone<Quiz>> {
    return this.http.get<ObjectRespone<Quiz>>(`${this.apiURL}/quiz/find/` + qid)
  }

  public getQuizzesOfCategory(cid: any): Observable<ObjectRespone<Quiz>> {
    return this.http.get<ObjectRespone<Quiz>>(`${this.apiURL}/quiz/allOfCategory/` + cid)
  }

  public updateQuiz(data: Quiz): Observable<ObjectRespone<Quiz>> {
    return this.http.put<ObjectRespone<Quiz>>(`${this.apiURL}/quiz/update`, data)
  }
}
