import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AjouterReclamationComponent } from './ajouter-reclamation/ajouter-reclamation.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthAdminGuard } from './guards/auth-admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { LoginAdminGuard } from './guards/login-admin.guard';
import { LoginGuard } from './guards/login.guard';
import { HomeComponent } from './home/home.component';
import { ListeReclamationsComponent } from './liste-reclamations/liste-reclamations.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:'',redirectTo:'login', pathMatch:'full'},
  {path:'login',
  canActivate : [LoginGuard],
  component:LogInComponent},
  {path:'signup',component:SignupComponent},
  {path:'home',
  canActivate:[AuthGuard]
  ,component:HomeComponent},
  {path:'ajouter-reclamation',
  canActivate:[AuthGuard],
  component:AjouterReclamationComponent},
  {path:'liste-reclamations',
  canActivate:[AuthGuard],
  component:ListeReclamationsComponent},
  {path:'admin',
  canActivate:[LoginAdminGuard],
  component:AdminLoginComponent},
  {path:'dashboard',
  canActivate:[AuthAdminGuard],
  component:DashboardComponent}
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
