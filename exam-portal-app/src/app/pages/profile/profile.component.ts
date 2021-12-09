import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AuthenService } from 'src/app/services/authen.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user : User;
  roleStr: string;

  constructor(private authenService: AuthenService) { }

  ngOnInit(): void {
    this.authenService.userCurrent$.subscribe(data => {
      this.user = data.result;
      this.roleStr = this.user.authorities.map(o => o.authority).join(", ");
    });
  }

}
