import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupForm !: FormGroup;


  constructor(private formbuilder: FormBuilder, private http: HttpClient, private router: Router) { }


  ngOnInit(): void {
    this.signupForm = this.formbuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.minLength(6)],
      firstname: [''],
      lastname: [''],
      address: [''],
      phone: ['']
    })
  }
  signup() {
    this.http.post<any>("http://localhost:3000/signupUsers", this.signupForm.value)
      .subscribe(res => {


        alert('signup successful');
        this.signupForm.reset();
        this.router.navigate(['login']);
      }, err => {
        alert('something went wrong');
      })
  }


}
