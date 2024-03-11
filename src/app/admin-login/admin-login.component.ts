import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private http: HttpClient , 
   private router:Router ,
    private authService : AuthService,
    private formbuilder : FormBuilder,
    private loginService:LoginService) { }
  public adminForm !: FormGroup;
  ngOnInit(): void {
    this.adminForm = this.formbuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.minLength(6)]
    })
  }
  login() {
    this.http.get<any>("http://localhost:3000/admin")
      .subscribe(res => {
        const admin = res.find((a: any) => {
          return a.email === this.adminForm.value.email && a.password === this.adminForm.value.password;
        });
        if (admin) {
          localStorage.setItem('AdminloggedIn',JSON.stringify(admin));
          alert('login successful');
          this.adminForm.reset();
          this.router.navigate(['dashboard']);
          localStorage.removeItem('loggedIn')

        } else {
          alert('admin not found');
          this.loginService.logIn();
        }
      }, err => {
        alert('something went wrong')
      }
      )

  }

}
