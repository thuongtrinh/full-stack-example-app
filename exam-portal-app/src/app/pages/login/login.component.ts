import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { Role } from 'src/app/enum/role.enum';
import { AppState } from 'src/app/interfaces/app-state';
import { Authority } from 'src/app/interfaces/authority';
import { ObjectRespone } from 'src/app/interfaces/object-respone';
import { TokenAccess } from 'src/app/interfaces/token-access';
import { User } from 'src/app/interfaces/user';
import { AuthenService } from 'src/app/services/authen.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  appState$: Observable<AppState<ObjectRespone<TokenAccess>>>;
  dataSubject = new BehaviorSubject<ObjectRespone<TokenAccess>>(null);
  loginForm: FormGroup;
  roleArr: Authority[];

  constructor(private snackbar: MatSnackBar, private authenService: AuthenService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', [ Validators.required, Validators.minLength(3) ]),
    });
  }

  submitForm(): void {
    if(this.username.invalid){
      this.snackbar.open('Please enter a valid username', 'OK', {
        duration: 1500
      });
    } else if (this.password.invalid) {
      this.snackbar.open('Please enter a valid password', 'OK', {
        duration: 1500
      });
    } else {
      if (this.loginForm.valid) {
        // this.appState$ = 
        this.authenService.login$(this.loginForm.value).pipe(
          map((response) => {
            this.dataSubject.next(
              {...response, result: { token: response.result.token}}
            );

            // this.loginForm.reset();
            // Swal.fire({
            //   position: 'center',
            //   icon: 'success',
            //   title: 'Login successful',
            //   showConfirmButton: false,
            //   timer: 1500
            // });

            this.authenService.setToken(this.dataSubject.value.result.token);
            this.authenService.getUserCurrent().subscribe((user: any) => {
              this.authenService.setUser(user.result);
              this.setUserRole(user.result);

              if(this.roleArr.filter(role => role.authority == Role.ADMIN).length > 0) {
                  // window.location.href = '/admin';
                  this.authenService.loginStatusSubject.next(true);
                  this.router.navigate(['admin']);
              } else if(this.roleArr.filter(role => role.authority == Role.USER).length > 0) {
                  // window.location.href = '/user-dashboard';
                  this.authenService.loginStatusSubject.next(true);
                  this.router.navigate(['user-dashboard']);
              } else {
                  this.authenService.logout();
              }
            });

            // return { appData: this.dataSubject.value };
          }),
          catchError((error: string) => {
            console.log(error);

            this.loginForm.reset();
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Login falied',
              showConfirmButton: false,
              timer: 1000
            });
            
            this.authenService.logout();
            return of({ appData: this.dataSubject.value });
          })
        ).subscribe();
        // this.appState$.subscribe();
      }
    }
  }

  setUserRole(user: User) {
    this.roleArr = user.authorities;
  }

  get username() {
    return this.loginForm.get('userName');
  }

  get password() {
    return this.loginForm.get('password');
  }

}
