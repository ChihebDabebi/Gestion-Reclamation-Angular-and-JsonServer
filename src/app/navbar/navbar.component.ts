import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AjouterReclamationComponent } from '../ajouter-reclamation/ajouter-reclamation.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  appName = 'Gestion Réclamations'

  constructor(public dialog: MatDialog,
    private router : Router) {}

  openDialog() {
    this.dialog.open(AjouterReclamationComponent);
  }

  ngOnInit(): void {
  }
  logout(){
    this.router.navigate(['login']);
    localStorage.removeItem('loggedIn');
  }

}
