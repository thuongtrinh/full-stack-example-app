import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { DataState } from './enum/data-state.enum';
import { AppState } from './interface/app-state';
import { Status } from "./enum/status.enum";
import { CustomRespone } from './interface/custom-respone';
import { ServerService } from './service/server.service';
import { NgForm } from '@angular/forms';
import { Server } from './interface/server';
import { NotificationService } from './service/notification.service';
import { NotifierService } from 'angular-notifier';
import { FetchdataService } from './service/fetchdata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  appState$: Observable<AppState<CustomRespone>>;
  readonly DataState = DataState;
  readonly Status = Status;

  private dataSubject = new BehaviorSubject<CustomRespone>(null);

  private filterSubject = new BehaviorSubject<string>('');
  filterStatus$ = this.filterSubject.asObservable();

  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();

  private errorAddServer = new BehaviorSubject<boolean>(false);
  errorAddServer$ = this.errorAddServer.asObservable();

  dataFetch: any;
  p: number = 1;
  pageSize: number  = 4;

  constructor(private serverService: ServerService, private notifier: NotificationService, private notifierService: NotifierService,
    private fetchData: FetchdataService) {
      this.getData();
  }

  ngOnInit(): void {
    this.appState$ = this.serverService.servers$
      .pipe(
        map((response) => {
          this.notifier.onDefault(response.message);
          this.dataSubject.next(response);
         return { dataState: DataState.LOADED_STATE, appData: {...response }}; 
        }),
        startWith({ dataState: DataState.LOADING_STATE }),
        catchError((error: string) => {
          this.notifier.onError(error);
          return of({ dataState: DataState.ERROR_STATE, error });
        })
      );
  }

  getData() {
    // this.fetchData.getData().subscribe(
    //   (data) => {
    //     this.dataFetch = data;
    //   }
    // );
  }

  pingServer(ipAddress: string): void {
    this.filterSubject.next(ipAddress);
    this.appState$ = this.serverService.ping$(ipAddress).pipe(
      map((response) => {
        const index = this.dataSubject.value.data.servers.findIndex(server => server.id == response.data.server.id);
        this.dataSubject.value.data.servers[index] = response.data.server;
        this.filterSubject.next('');
        this.notifier.onDefault(response.message);
        return { dataState: DataState.LOADED_STATE, appData: this.dataSubject.value };
      }),
      startWith({ dataState: DataState.LOADED_STATE, appData: this.dataSubject.value }),
      catchError((error: string) => {
        this.notifier.onError(error);
        return of({ dataState: DataState.ERROR_STATE, error });
      })
    );
  }

  filterServers(status: Status): void {
    this.appState$ = this.serverService.filter$(status, this.dataSubject.value).pipe(
      map((response) => {
        this.notifier.onDefault(response.message);
        return { dataState: DataState.LOADED_STATE, appData:response };
      }),
      startWith({ dataState: DataState.LOADED_STATE, appData: this.dataSubject.value }),
      catchError((error: string) => {
        this.notifier.onError(error);
        return of({ dataState: DataState.ERROR_STATE, error });
      })
    );
  }

  saveServer(serverForm: NgForm): void {
    this.isLoading.next(true);
    this.errorAddServer.next(false);
    this.appState$ = this.serverService.save$(serverForm.value as Server).pipe(
      map((response) => {
        this.dataSubject.next(
          {...response, data: { servers: [response.data.server, ...this.dataSubject.value.data.servers] }}
        );
        serverForm.reset();
        this.isLoading.next(false);
        document.getElementById('close-add-server-model').click();
        this.notifier.onSuccess(response.message);
        return { dataState: DataState.LOADED_STATE, appData: this.dataSubject.value };
      }),
      startWith({ dataState: DataState.LOADED_STATE, appData: this.dataSubject.value }),
      catchError((error: string) => {
        this.isLoading.next(false);
        this.errorAddServer.next(true);
        this.notifier.onError(error);
        return of({ dataState: DataState.LOADED_STATE, appData: this.dataSubject.value });
      })
    );
  }

  resetServerForm(serverForm: NgForm): void{
    serverForm.reset();
    this.errorAddServer.next(false);
    this.isLoading.next(false);
  }

  deleteServer(server: Server): void {
    this.appState$ = this.serverService.delete$(server.id).pipe(
      map((response) => {
        this.dataSubject.next(
          {...response, data: { servers: this.dataSubject.value.data.servers.filter(s => s.id !== server.id) }}
        );
        this.notifier.onSuccess(response.message);
        return { dataState: DataState.LOADED_STATE, appData: this.dataSubject.value };
      }),
      startWith({ dataState: DataState.LOADED_STATE, appData: this.dataSubject.value }),
      catchError((error: string) => {
        this.notifier.onError(error);
        return of({ dataState: DataState.LOADED_STATE, appData: this.dataSubject.value });
      })
    );
  }

  printReportPDF(): void {
    window.print();
    this.notifier.onDefault("Printed report pdf");
  }

  printReportExcel(): void {
    let dataType = 'application/vnd.ms-excel.sheet.macroEnabled.12';
    let tableSelect = document.getElementById('server-tbl');
    let tableHtml = tableSelect.outerHTML.replace(/ /g, '%20');
    let downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);
    downloadLink.href = 'data:' + dataType + ', ' + tableHtml;
    downloadLink.download = 'server-report.xls';
    downloadLink.click();
    document.body.removeChild(downloadLink);
    this.notifier.onDefault("Downloaded report pdf");
  }

}
