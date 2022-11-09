import { Component, OnInit } from '@angular/core';
import {Utilisateur} from "../../api/models/Utilisateur";
import {TokenStorageService} from "../../authentification/token.service";
import {AuthService} from "../../authentification/auth.service";
import {NoteComponent} from "../../common/component/note/note.component";
import {CommonFormKey} from "../../common/form/keys/common-form-key";
import {MatDialog} from "@angular/material/dialog";
import {UpdatePasswordComponent} from "../../common/component/update-password/update-password.component";

@Component({
  selector: 'app-utilisateur-profil',
  templateUrl: './utilisateur-profil.component.html',
  styleUrls: ['./utilisateur-profil.component.scss']
})
export class UtilisateurProfilComponent implements OnInit {

  utilisateur?: Utilisateur;
  utilisateurs?: Utilisateur[] = [];
  constructor(private readonly tokenService: TokenStorageService,
              private readonly dialog: MatDialog) { }

  ngOnInit(): void {
    this.utilisateur = this.tokenService.getUser();
    console.log("appel liste utilisateurs")
  }

  modifierEmail() {

  }

  modifierMdp() {
    return this.dialog.open(UpdatePasswordComponent, {
      width: '1000px',
      disableClose: false,
      data: {
      }
    }).afterClosed().subscribe(result => {

    });
  }

}
