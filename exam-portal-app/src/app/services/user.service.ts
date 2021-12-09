import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { CustomRespone } from '../interfaces/custom-respone';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiURL = 'http://localhost:8080/exam-portal';

  constructor(private http: HttpClient) { }

  servers$ = <Observable<CustomRespone<User>>>
    this.http.get<CustomRespone<User>>(`${this.apiURL}/user/all`)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );
  
  create$ = (user: User) => { 
    return <Observable<CustomRespone<User>>>
    this.http.post<CustomRespone<User>>(`${this.apiURL}/user/create`, user)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );
  }
 
  handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    throw new Error(`An error occurred - Error code: ${error.status}`);
  }
}
