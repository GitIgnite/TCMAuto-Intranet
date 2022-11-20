import {Component, OnInit} from '@angular/core';
import {Utilisateur} from "../../api/models/Utilisateur";
import {TokenStorageService} from "../../authentification/token.service";
import {MatDialog} from "@angular/material/dialog";
import {UpdatePasswordComponent} from "../../common/component/update-password/update-password.component";
import {UpdateEmailComponent} from "../../common/component/update-email/update-email.component";

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
    return this.dialog.open(UpdateEmailComponent, {
      width: '500px',
      disableClose: false,
      data: {
      }
    }).afterClosed().subscribe(result => {

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

}
