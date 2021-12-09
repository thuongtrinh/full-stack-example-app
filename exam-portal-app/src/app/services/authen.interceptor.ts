import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenService } from './authen.service';

// const TOKEN_HEADER = 'Authorization';

@Injectable()
export class AuthenInterceptor implements HttpInterceptor {

  constructor(private authenService: AuthenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // add the jwt token (localStorage) request
    let authReq = request;
    const token = this.authenService.getToken();

    if(token != null) {
      authReq = authReq.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(authReq);
  }
}

export const authenInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenInterceptor,
    multi: true
  }
]
