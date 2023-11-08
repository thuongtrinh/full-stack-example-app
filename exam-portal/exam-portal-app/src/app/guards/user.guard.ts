import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from '../enum/role.enum';
import { AuthenService } from '../services/authen.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private authenService: AuthenService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(this.authenService.isLoggedIn() && this.authenService.getUserRole().filter(role => role.authority == Role.USER).length > 0) {
        return true;
      }

      return this.router.navigate(['login']);;
  }
  
}
