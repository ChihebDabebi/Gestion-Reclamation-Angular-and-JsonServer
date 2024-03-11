import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { AjouterReclamationComponent } from '../ajouter-reclamation/ajouter-reclamation.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConsultationComponent } from '../consultation/consultation.component';
@Component({
  selector: 'app-liste-reclamations',
  templateUrl: './liste-reclamations.component.html',
  styleUrls: ['./liste-reclamations.component.css']
})
export class ListeReclamationsComponent implements OnInit {

  displayedColumns: string[] = ['status', 'degree', 'type', 'details', 'fichier', 'action'];
  dataSource!: MatTableDataSource<any>;
  public condition: Boolean = false;
  constructor(private api: ApiService,
    private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.getAllReclamations();
  }

  getAllReclamations() {
    this.api.getReclamation()
      .subscribe({
        next: (res) => {

          const obj: any = localStorage.getItem('loggedIn');
          const email = JSON.parse(obj).email;
          this.dataSource = new MatTableDataSource(res.filter((e: { owner: any; }) => {
            return e.owner === email;
          }));
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
  openDialog(id: number) {
   
    
    const dialogRef = this.dialog.open(ConsultationComponent, {
      data: id
    });
  }
}





