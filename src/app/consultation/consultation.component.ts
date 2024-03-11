import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})

export class ConsultationComponent implements OnInit {


  public reclam!: any;
  private id: any;

  constructor(private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.id = data;
      console.log(this.id)
      console.log(data)
    }

  ngOnInit(): void {

    // const reclamation = JSON.parse(rec );
    this.consultReclamation();




  }
  consultReclamation() {
    this.api.getReclamationById(this.id)
    .subscribe({
      next: (res) => {
        console.log(res);

        // if (localStorage.getItem('reclamation')) {
        //   localStorage.removeItem('reclamation');
        //   localStorage.setItem('reclamation', JSON.stringify(res))
        // }
        this.reclam = res;

      },
      error: (err) => {
        alert('error')
      }
    })

    // const rec: any = localStorage.getItem('reclamation');
    // console.log(rec);

    // const parsedReclam = JSON.parse(rec);
    // this.reclam = parsedReclam;
    // console.log(this.reclam);

  }

}
