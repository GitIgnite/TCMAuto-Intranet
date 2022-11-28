import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Utilisateur} from "../../api/models/Utilisateur";
import {TokenStorageService} from "../../authentification/token.service";
import {MatDialog} from "@angular/material/dialog";
import {UpdatePasswordComponent} from "../../common/component/update-password/update-password.component";
import {UpdateEmailComponent} from "../../common/component/update-email/update-email.component";
import {UtilisateurCreateComponent} from "../utilisateur-create/utilisateur-create.component";
import {AuthService} from "../../authentification/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MessageKeys} from "../../common/form/keys/message-keys";

@Component({
  selector: 'app-utilisateur-profil',
  templateUrl: './utilisateur-profil.component.html',
  styleUrls: ['./utilisateur-profil.component.scss']
})
export class UtilisateurProfilComponent implements OnInit {

  utilisateur?: Utilisateur;
  utilisateurs?: Utilisateur[] = [];
  roles?: any[] = [];
  messageKeys = MessageKeys;

  constructor(private readonly tokenService: TokenStorageService,
              private readonly dialog: MatDialog,
              private authService: AuthService,
              private readonly _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.utilisateur = this.tokenService.getUser();
    this.getRoles();
  }

  getRoles() {
    this.authService.getRoles().subscribe(roles => {
      this.roles = roles;
    });
  }

  modifierEmail() {
    return this.dialog.open(UpdateEmailComponent, {
      width: '500px',
      disableClose: false,
      data: {
        user: this.utilisateur
      }
    }).afterClosed().subscribe(result => {
      if(this.utilisateur && result && result.userUpdated) {
        this.utilisateur = result.userUpdated;
      }
    });
  }

  modifierMdp() {
    return this.dialog.open(UpdatePasswordComponent, {
      width: '500px',
      disableClose: false,
      data: {
      }
    }).afterClosed().subscribe(result => {
    });
  }

  createUser() {
    return this.dialog.open(UtilisateurCreateComponent, {
      width: '500px',
      disableClose: false,
      data: {
        roles : this.roles
      }
    }).afterClosed().subscribe(result => {
      if(!this.utilisateurs) {
        this.utilisateurs = [];
      }
      if(result && result.objet) {
        this.utilisateurs.push(result.objet);
        this._snackBar.open(this.messageKeys.USER_CREATED, 'OK');
      }

    });
  }

}
