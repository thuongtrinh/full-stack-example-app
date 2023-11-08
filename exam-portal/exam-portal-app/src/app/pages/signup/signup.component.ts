import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { AppState } from 'src/app/interfaces/app-state';
import { CustomRespone } from 'src/app/interfaces/custom-respone';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  appState$: Observable<AppState<CustomRespone<User>>>;
  dataSubject = new BehaviorSubject<CustomRespone<User>>(null);
  userForm: FormGroup;

  constructor(private userService: UserService, private snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', [ Validators.required, Validators.minLength(3) ]),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [ Validators.required, Validators.email ]),
      phone: new FormControl('', [ Validators.required, Validators.minLength(10), Validators.maxLength(10) ]),
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
    } else if (this.firstname.invalid) {
      this.snackbar.open('Please enter a valid firstname', 'OK', {
        duration: 1500
      });
    } else if (this.lastname.invalid) {
      this.snackbar.open('Please enter a valid lastname', 'OK', {
        duration: 1500
      });
    } else if (this.email.invalid) {
      this.snackbar.open('Please enter a valid email', 'OK', {
        duration: 1500
      });
    } else if (this.phone.invalid) {
      this.snackbar.open('Please enter a valid phone', 'OK', {
        duration: 1500
      });
    } else {
      if (this.userForm.valid) {
        this.appState$ = this.userService.create$(this.userForm.value as User).pipe(
          map((response) => {
            this.dataSubject.next(
              {...response, data: { user: response.data.user }}
            );
            
            this.userForm.reset();
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'User has been created successful',
              showConfirmButton: false,
              timer: 1500
            });
            
            return { appData: this.dataSubject.value };
          }),
          catchError((error: string) => {
            alert(error);
            return of({ appData: this.dataSubject.value });
          })
        );
      }
    }
  }

  get username() {
    return this.userForm.get('userName');
  }

  get password() {
    return this.userForm.get('password');
  }

  get firstname() {
    return this.userForm.get('firstName');
  }

  get lastname() {
    return this.userForm.get('lastName');
  }

  get phone() {
    return this.userForm.get('phone');
  }

  get email() {
    return this.userForm.get('email');
  }

}
