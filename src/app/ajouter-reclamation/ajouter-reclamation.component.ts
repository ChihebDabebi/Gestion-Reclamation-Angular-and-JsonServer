import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListeReclamationsComponent } from '../liste-reclamations/liste-reclamations.component';

interface Status {
  value: String,
  viewValue: string;
}
interface Degree {
  value: String,
  viewValue: String;
}
interface type {
  value: String,
  viewValue: String;
}


@Component({
  selector: 'app-ajouter-reclamation',
  templateUrl: './ajouter-reclamation.component.html',
  styleUrls: ['./ajouter-reclamation.component.css']
})
export class AjouterReclamationComponent implements OnInit {
  // public LoggedIn = localStorage.getItem('loggedIn')
  LoggedIn = localStorage.getItem('loggedIn');
  actionBtn: String = 'save';

  public ajoutForm !: FormGroup;

  constructor(private dialog: MatDialog,
    private formbuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<AjouterReclamationComponent>) { }

  ngOnInit(): void {
    this.ajoutForm = this.formbuilder.group({
      status: ['nouvelle'],
      degree: ['', Validators.required],
      type: ['', Validators.required],
      details: ['', Validators.required],
      fichier: ['']
    })
    if (this.editData) {
      this.actionBtn = ' update';
      this.ajoutForm.controls['status'].setValue(this.editData.status);
      this.ajoutForm.controls['degree'].setValue(this.editData.degree);
      this.ajoutForm.controls['type'].setValue(this.editData.type);

      this.ajoutForm.controls['details'].setValue(this.editData.details);
      this.ajoutForm.controls['fichier'].setValue(this.editData.fichier);
    }




  }


  status: Status[] = [
    { value: 'nouvelle', viewValue: 'Nouvelle' },
    { value: 'en cours ', viewValue: 'En cours' },
    { value: 'traitée ', viewValue: 'Traitée' }

  ];
  degrees: Degree[] = [
    { value: 'normale', viewValue: 'Normale' },
    { value: 'urgente', viewValue: 'urgente' },
    { value: 'trés urgente', viewValue: 'trés urgente' }
  ];
  types: type[] = [
    { value: 'bug', viewValue: 'Bug' },
    { value: 'lenteur', viewValue: 'Lenteur' },
    { value: 'optimisation', viewValue: 'Optimisation' },
  ];
  ajoutReclamation() {
     
    if (!this.editData) {
      if (this.ajoutForm.valid) {
        const obj: any = localStorage.getItem('loggedIn');
        const email = JSON.parse(obj).email;
        const data = { ...this.ajoutForm.value, owner: email }
        this.api.postReclamation(data)
          .subscribe({
            next: (res) => {
              alert("reclamation ajoutée avec succées");
              console.log(res);
              console.log(this.LoggedIn);
              


              this.ajoutForm.reset();
              this.dialogRef.close('save');
            },
            error: () => {
              alert("erreur pendant l'ajout de la reclamation")
            }
          })
      }
    } else {
      this.updateReclamation();
    }
  }



  updateReclamation() {
    
    const obj:any = localStorage.getItem('reclamation')
    const owner =  JSON.parse(obj).owner;
    const data = {...this.ajoutForm.value, owner: owner }
    this.api.putReclamation(data, this.editData.id)
      .subscribe({
        next: (res) => {
          console.log(res);


          alert("reclamation updated succesfully");
          this.ajoutForm.reset();
          this.dialogRef.close('update');

        },
        error: () => {
          alert('something went wrong ');
        }
      })
  }





}


