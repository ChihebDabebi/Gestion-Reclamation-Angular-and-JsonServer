import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isLogged = true;

  constructor() { }

  IsLoggedIn() {
    return this.isLogged;
  }

  logIn() {
    this.isLogged = false;
  }}
