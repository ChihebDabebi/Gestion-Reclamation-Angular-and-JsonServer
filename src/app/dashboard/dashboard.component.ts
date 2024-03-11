import { Component, Inject, inject, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AjouterReclamationComponent } from '../ajouter-reclamation/ajouter-reclamation.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConsultationComponent } from '../consultation/consultation.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['status', 'degree', 'type', 'details', 'fichier', 'action'];
  dataSource!: MatTableDataSource<any>;

  constructor(private api: ApiService,
    private router: Router,

    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllReclamations();


  }
  getAllReclamations() {
    this.api.getReclamation()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          
        },
        error: (err) => {
          alert('error')
        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  deleteReclamation(id: number) {
    if (confirm("êtes-vous sûr de vouloir supprimer cette réclamation?")) {
      this.api.deleteProduct(id)
        .subscribe({
          next: (res) => {
            this.getAllReclamations();
          },
          error: () => {
            alert('error')
            
          }
        })
    }
  }
  editReclamation(row: any, id : number) {
    this.api.getReclamationById(id)
      .subscribe({
        next: (res) => {
          console.log(res);

          localStorage.setItem('reclamation', JSON.stringify(res))

        },
        error: (err) => {
          alert('error')
        }
      })
    this.dialog.open(AjouterReclamationComponent, {
      width: '30%',
      data: row
      
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllReclamations()
      }
    })
  }
  openDialog() {
    this.dialog.open(AjouterReclamationComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllReclamations();
      }
    })
  }
  openConsultDialog(id: number) {
    
     
    const dialogRef = this.dialog.open(ConsultationComponent, {
      data: id
    });
  }



}
