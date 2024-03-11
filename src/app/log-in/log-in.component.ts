import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  public loginForm !: FormGroup;


  user: any = {};
  constructor(private formbuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private loginService: LoginService) {

  }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.minLength(6)]
    })
  }
  login() {
    this.http.get<any>("http://localhost:3000/signupUsers")
      .subscribe(res => {
        const user = res.find((a: any) => {
          return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password;
        });
        if (user) {
          alert('login successful');
          localStorage.removeItem('AdminloggedIn')
          localStorage.setItem('loggedIn', JSON.stringify(user));
          this.loginForm.reset();
          this.router.navigate(['home']);



        } else {
          alert('user not found');
          this.loginService.logIn();
        }
      }, err => {
        alert('something went wrong')
      }
      )

  }


}
