import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientComponent} from "./client/client.component";
import {VehiculeComponent} from './vehicule/vehicule.component';
import {LoginComponent} from "./login/login.component";
import {AuthGuardService} from "./authentification/auth-guard.service";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: '', redirectTo: '/vehicule', pathMatch: 'full', canActivate: [AuthGuardService]},
  {path: 'vehicule', component: VehiculeComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'client', component: ClientComponent, canActivate: [AuthGuardService]}];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
