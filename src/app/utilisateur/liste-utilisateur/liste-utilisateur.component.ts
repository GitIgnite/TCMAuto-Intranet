import {Component, Input, OnInit} from '@angular/core';
import {Utilisateur} from "../../api/models/Utilisateur";
import {MatTableDataSource} from "@angular/material/table";
import {AuthService} from "../../authentification/auth.service";
import {UpdateEmailComponent} from "../../common/component/update-email/update-email.component";
import {UpdatePasswordComponent} from "../../common/component/update-password/update-password.component";
import {MatDialog} from "@angular/material/dialog";
import {UpdateRoleComponent} from "../../common/component/update-role/update-role.component";
import {Client} from "../../api/models/Client";

@Component({
  selector: 'app-liste-utilisateur',
  templateUrl: './liste-utilisateur.component.html',
  styleUrls: ['./liste-utilisateur.component.scss']
})
export class ListeUtilisateurComponent implements OnInit {

  @Input()
  utilisateurs?: Utilisateur[] = [];
  roles?: any[] = [];
  dataSource = new MatTableDataSource<Utilisateur>();

  displayedColumns: string[] = ['username', 'email', 'roles', 'actions'];

  constructor(private readonly authService: AuthService,
              private readonly dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getUsers();
    this.getRoles();
  }

  getUsers() {
    this.authService.listeUtilisateur().subscribe(utilisateurs => {
      this.utilisateurs = utilisateurs;
      this.dataSource.data = utilisateurs;
    });
  }

  getRoles() {
    this.authService.getRoles().subscribe(roles => {
      this.roles = roles;
    });
  }

  modifierEmail(username: string) {
    return this.dialog.open(UpdateEmailComponent, {
      width: '500px',
      disableClose: false,
      data: {
        username: username
      }
    }).afterClosed().subscribe(result => {

    });
  }

  modifierMdp(username: string) {
    return this.dialog.open(UpdatePasswordComponent, {
      width: '500px',
      disableClose: false,
      data: {
        username: username
      }
    }).afterClosed().subscribe(result => {

    });
  }

  deleteUser(utilisateur: Utilisateur): void {
    console.log('delete')
    if (utilisateur && utilisateur.id) {
      this.authService.deleteUser(utilisateur.id)
    }
  }

  updateRole(user: Utilisateur) {
    return this.dialog.open(UpdateRoleComponent, {
      width: '500px',
      disableClose: false,
      data: {
        user: user,
        roles: this.roles
      }
    }).afterClosed().subscribe(result => {
      console.log("updated user")
      if (result.userUpdated) {
        this.updateUserInsideList(result.userUpdated);
      }
    });
  }

  /**
   * Mise à jour de l'utilisateur dans la liste sans actualiser la page
   * @param userUpdated
   */
  public updateUserInsideList(userUpdated: Utilisateur) {
    if (this.utilisateurs) {
      let userFound: Utilisateur | undefined = this.utilisateurs.find(user => user.id == userUpdated.id);
      if (userFound) {
        var indexUser = this.utilisateurs.indexOf(userFound);
        this.utilisateurs[indexUser] = userUpdated;
        this.dataSource.data = this.utilisateurs;
      }
    }
  }

}
