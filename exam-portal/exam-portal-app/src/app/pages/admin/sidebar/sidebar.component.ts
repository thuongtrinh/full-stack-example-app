import { Component, OnInit } from '@angular/core';
import { AuthenService } from 'src/app/services/authen.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private authenService: AuthenService) { }

  ngOnInit(): void {
  }

  public logout() {
    this.authenService.logout();
    this.authenService.loginStatusSubject.next(false);
    window.location.reload();

  }
}
