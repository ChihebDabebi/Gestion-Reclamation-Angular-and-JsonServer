import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }
  postReclamation(data : any){
     return this.http.post<any>("http://localhost:3000/reclamations/",data);
  }
  getReclamation(){
   return this.http.get<any>("http://localhost:3000/reclamations/");
  }
  deleteProduct(id:number){
    return this.http.delete<any>("http://localhost:3000/reclamations/"+id);
  }
  putReclamation(data : any , id:number){
   
    return this.http.put<any>("http://localhost:3000/reclamations/"+id,data);
  }
  // getUserById(id : String){
  //   return this.http.get<any>(`http://localhost:3000/signupUsers ${id}`);
  // }
  getReclamationById(id : number){
    return this.http.get<any>(`http://localhost:3000/reclamations/${id}`);
  }
  
  
}
