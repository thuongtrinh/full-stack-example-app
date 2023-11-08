import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomRespone } from '../interface/custom-respone';
import { Observable } from 'rxjs';
import { tap, catchError, filter } from 'rxjs/operators';
import { Server } from '../interface/server';
import { Status } from '../enum/status.enum';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private readonly apiURL = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  servers$ = <Observable<CustomRespone>>
    this.http.get<CustomRespone>(`${this.apiURL}/server/list`)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );

  save$ = (server: Server) => <Observable<CustomRespone>>
    this.http.post<CustomRespone>(`${this.apiURL}/server/save`, server)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );

  ping$ = (ipAddress: string) => <Observable<CustomRespone>>
    this.http.get<CustomRespone>(`${this.apiURL}/server/ping/${ipAddress}`)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );

  delete$ = (serverId: number) => <Observable<CustomRespone>>
    this.http.delete<CustomRespone>(`${this.apiURL}/server/delete/${serverId}`)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );

  filter$ = (status: Status, response: CustomRespone) => <Observable<CustomRespone>>
    new Observable<CustomRespone>(
      subscribe => {
        console.log(response);
        subscribe.next(
          status === Status.ALL ? { ...response, message: `Servers filtered by ${status} status`} : 
          {
            ...response,
            message: response.data.servers.filter(server => server.status === status).length > 0 ? 
                `Servers filtered by ${status === Status.SERVER_UP ? 'SERVER UP' : 'SERVER DOWN'} status` : `No servers of ${status} found`,
            data: {
              servers: response.data.servers?.filter(server => server.status === status)
            }
          }
        );
        subscribe.complete();
      }
    )
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );

  handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    throw new Error(`An error occurred - Error code: ${error.status}`);
  }

}
