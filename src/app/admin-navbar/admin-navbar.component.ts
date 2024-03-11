import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {
  appName = 'Admin Dashboard'
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  logout(){
    this.router.navigate(['admin']);
    localStorage.removeItem('AdminloggedIn');
    localStorage.removeItem('reclamations');
  }

}
