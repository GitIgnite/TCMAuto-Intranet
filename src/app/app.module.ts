import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './header/header.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list'
import {ClientComponent} from './client/client.component';
import {ClientService} from "./api/services/client.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {VehiculeComponent} from './vehicule/vehicule.component';
import {ClientRechercheComponent} from './client/client-recherche/client-recherche.component';
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
  MatFormFieldModule
} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {VehiculeRechercheComponent} from './vehicule/vehicule-recherche/vehicule-recherche.component';
import {MatSelectModule} from '@angular/material/select';
import {ModeleService} from './api/services/modele.service';
import {ClientCreateComponent} from './client/client-create/client-create.component';
import {MatDialogModule} from "@angular/material/dialog";
import {VehiculeCreateComponent} from './vehicule/vehicule-create/vehicule-create.component';
import {AdresseService} from "./api/services/adresse.service";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatRadioModule} from '@angular/material/radio';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {DatePipe, HashLocationStrategy, LocationStrategy} from "@angular/common";
import {VehiculeService} from './api/services/vehicule.service';
import {GestionEquipementComponent} from './vehicule/gestion-equipement/gestion-equipement.component';
import {CategorieService} from "./api/services/categorie.service";
import {EnergieService} from "./api/services/energie.service";
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {EquipementsComponent} from './vehicule/gestion-equipement/equipements/equipements.component';
import {
  EquipementAdditionnelsComponent
} from './vehicule/gestion-equipement/equipement-additionnels/equipement-additionnels.component';
import {EquipementService} from './api/services/equipement.service';
import {NotificationComponent} from "./common/component/notification/notification.component";
import {HttpService} from "./api/services/http/http.service";
import {VehiculeDetailComponent} from './vehicule/vehicule-detail/vehicule-detail.component';
import {
  VehiculeResultatRechercheComponent
} from './vehicule/vehicule-resultat-recherche/vehicule-resultat-recherche.component';
import {VehiculeEquipementService} from './api/services/vehiculeEquipement.service';
import {MandatService} from "./api/services/mandat.service";
import {VariablesGlobales} from './variablesGlobales';
import {NoteComponent} from './common/component/note/note.component';
import {VehiculeGestionPhotoComponent} from './vehicule/vehicule-photo/vehicule-gestion-photo.component';
import {DocumentService} from "./api/services/document.service";
import {LoginComponent} from './login/login.component';
import {authInterceptorProviders} from "./authentification/auth.interceptor";
import {AuthGuardService} from "./authentification/auth-guard.service";
import {
  TelechargementPhotoComponent
} from './vehicule/vehicule-photo/telechargement-photo/telechargement-photo.component';
import {VehiculePhotoService} from './api/services/vehiculePhoto.service';
import {OrdonnerPhotoComponent} from './vehicule/vehicule-photo/ordonner-photo/ordonner-photo.component';
import { GridsterModule } from 'angular-gridster2';

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline'
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ClientComponent,
    VehiculeComponent,
    ClientRechercheComponent,
    VehiculeRechercheComponent,
    ClientCreateComponent,
    VehiculeCreateComponent,
    GestionEquipementComponent,
    EquipementsComponent,
    EquipementAdditionnelsComponent,
    NotificationComponent,
    VehiculeDetailComponent,
    VehiculeResultatRechercheComponent,
    NoteComponent,
    VehiculeGestionPhotoComponent,
    LoginComponent,
    TelechargementPhotoComponent,
    OrdonnerPhotoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatRadioModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatCardModule,
    GridsterModule
  ],
    providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, AuthGuardService, HttpService, HttpClient, ClientService, ModeleService, AdresseService, VehiculeService, CategorieService, EnergieService, EquipementService, VehiculeEquipementService, VariablesGlobales, MandatService, DocumentService, VehiculePhotoService, {
    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
    useValue: appearance
  },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    DatePipe, authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
