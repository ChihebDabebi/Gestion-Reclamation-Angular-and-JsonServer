import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 // private isLogged = false;

  constructor() { }

 // IsLoggedIn() {
 //   return this.isLogged;
 // }

  //logIn() {
   // this.isLogged = true;
 // }
 loggedIn(){
  return !!localStorage.getItem('loggedIn');
 }
 currentUser(){
 
  
 }

 
}
