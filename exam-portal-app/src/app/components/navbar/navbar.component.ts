import { Component, OnInit } from '@angular/core';
import { AuthenService } from 'src/app/services/authen.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  user = null;

  constructor(public authenService: AuthenService) { }

  ngOnInit(): void {
    this.authenService.loginStatusSubject.asObservable().subscribe(data => {
      this.isLoggedIn = this.authenService.isLoggedIn();
      this.user = this.authenService.getUser();
    });
  }

  /**
   * logout
   */
  public logout() {
    this.authenService.logout();
    this.authenService.loginStatusSubject.next(false);
    window.location.reload();

  }
}
