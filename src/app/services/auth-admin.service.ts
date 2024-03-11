import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminService {

  constructor() { }
  loggedIn(){
  
    return !!localStorage.getItem('AdminloggedIn');
  }
}
