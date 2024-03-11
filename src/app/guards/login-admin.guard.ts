import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthAdminService } from '../services/auth-admin.service';

@Injectable({
  providedIn: 'root'
})
export class LoginAdminGuard implements CanActivate {
  constructor(private service : AuthAdminService , private router :Router){}
  canActivate(){
    if(this.service.loggedIn()){
     this.router.navigate(['dashboard']);
      return false;
    }else{
      return true;
    }
  }
    
   
  }
  

