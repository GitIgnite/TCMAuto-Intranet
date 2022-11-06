import { Component, OnInit } from '@angular/core';
import {Utilisateur} from "../../api/models/Utilisateur";
import {TokenStorageService} from "../../authentification/token.service";

@Component({
  selector: 'app-utilisateur-profil',
  templateUrl: './utilisateur-profil.component.html',
  styleUrls: ['./utilisateur-profil.component.scss']
})
export class UtilisateurProfilComponent implements OnInit {

  utilisateur?: Utilisateur;
  constructor(private readonly tokenService: TokenStorageService) { }

  ngOnInit(): void {
    this.utilisateur = this.tokenService.getUser();
  }

}
