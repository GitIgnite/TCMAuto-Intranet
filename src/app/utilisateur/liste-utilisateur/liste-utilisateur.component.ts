import {Component, Input, OnInit} from '@angular/core';
import {Utilisateur} from "../../api/models/Utilisateur";
import {MatTableDataSource} from "@angular/material/table";
import {AuthService} from "../../authentification/auth.service";

@Component({
  selector: 'app-liste-utilisateur',
  templateUrl: './liste-utilisateur.component.html',
  styleUrls: ['./liste-utilisateur.component.scss']
})
export class ListeUtilisateurComponent implements OnInit {

  @Input()
  utilisateurs?: Utilisateur[] = [];

  dataSource = new MatTableDataSource<Utilisateur>();

  displayedColumns: string[] = ['username', 'email', 'roles', 'actions'];

  constructor(private readonly authService: AuthService) { }

  ngOnInit(): void {
    this.authService.listeUtilisateur().subscribe(utilisateurs => {
      this.utilisateurs = utilisateurs;
      this.dataSource.data = utilisateurs;
    })
  }

  deleteUtilisateur(utilisateur: Utilisateur): void {

  }

  modifierRoles(utilisateur: Utilisateur): void {

  }

  editClient(utilisateur: Utilisateur): void {

  }
}
