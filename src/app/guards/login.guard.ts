import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private service :AuthService , private router : Router){}
  canActivate() {
    if (this.service.loggedIn()) {
       this.router.navigate(['home']);
      return false;
     
    } else {
      
      return true;
    }
  }
  
}
