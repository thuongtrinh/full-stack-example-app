import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { Constant } from '../enum/constant.enum';
import { Authority } from '../interfaces/authority';
import { ObjectRespone } from '../interfaces/object-respone';
import { TokenAccess } from '../interfaces/token-access';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  private readonly apiURL = Constant.apiURL;
  public loginStatusSubject = new BehaviorSubject<boolean>(null);

  constructor(private http: HttpClient) { }

  login$ = (userLogin: any) => { 
    return <Observable<ObjectRespone<TokenAccess>>>
    this.http.post<ObjectRespone<TokenAccess>>(`${this.apiURL}/authen/generate-token`, userLogin)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );
  }

  public getUserCurrent() { 
    return this.http.get<ObjectRespone<User>>(`${this.apiURL}/authen/current-user`)
  }

  public userCurrent$ = 
    this.http.get<ObjectRespone<User>>(`${this.apiURL}/authen/current-user`).pipe(
      tap(console.log),
      catchError(this.handleError)
    );

  handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    throw new Error(`An error occurred - Error code: ${error.status}`);
  }

  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');

    if(tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public setToken(tokenVal : string) {
    localStorage.setItem('token', tokenVal);
  }

  public getUser(): User {
    let userStr = localStorage.getItem('user');
    const user = JSON.parse(userStr) as User;

    if (user != null) {
      return user;
    } else {
      this.logout();
      return null;
    }
  }

  public setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserRole(): Authority[]{
    let userStr = localStorage.getItem('user');
    const user = JSON.parse(userStr) as User;

    if (user != null && user.authorities) {
      return user.authorities as Authority[];
    } else {
      return [];
    }
  }

}
