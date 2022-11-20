import {Component, Input, OnInit} from '@angular/core';
import {Utilisateur} from "../../api/models/Utilisateur";
import {MatTableDataSource} from "@angular/material/table";
import {AuthService} from "../../authentification/auth.service";
import {UpdateEmailComponent} from "../../common/component/update-email/update-email.component";
import {UpdatePasswordComponent} from "../../common/component/update-password/update-password.component";
import {MatDialog} from "@angular/material/dialog";
import {UpdateRoleComponent} from "../../common/component/update-role/update-role.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MessageKeys} from "../../common/form/keys/message-keys";

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
  messageKeys = MessageKeys;

  displayedColumns: string[] = ['username', 'email', 'roles', 'actions'];

  constructor(private readonly authService: AuthService,
              private readonly dialog: MatDialog,
              private readonly _snackBar: MatSnackBar) {
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

  modifierEmail(user: Utilisateur) {
    return this.dialog.open(UpdateEmailComponent, {
      width: '500px',
      disableClose: false,
      data: {
        user: user
      }
    }).afterClosed().subscribe(result => {
      if (result.userUpdated) {
        this.updateUserInsideList(result.userUpdated);
      }
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

  deleteUser(user: Utilisateur): void {
    console.log('delete')
    if (user && user.id) {
      let userId = user.id;
      this.authService.deleteUser(userId).subscribe(() => {
        this._snackBar.open(this.messageKeys.UTILISATEUR_DELETED, 'OK');
        this.deleteUserInsideList(userId);
      })
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
      if (result.userUpdated) {
        this.updateUserInsideList(result.userUpdated);
      }
    });
  }

  /**
   * Mise à jour de l'utilisateur dans la liste sans actualiser la page
   * @param userUpdated
   */
  private updateUserInsideList(userUpdated: Utilisateur) {
    if (this.utilisateurs) {
      let userFound: Utilisateur | undefined = this.utilisateurs.find(user => user.id == userUpdated.id);
      if (userFound) {
        var indexUser = this.utilisateurs.indexOf(userFound);
        this.utilisateurs[indexUser] = userUpdated;
        this.dataSource.data = this.utilisateurs;
      }
    }
  }

  /**
   * Mise à jour de de la liste en supprimant l'utilisateur sans actualiser la page
   * @param userIdDeleted
   * @private
   */
  private deleteUserInsideList(userIdDeleted: string) {
    console.log('user id')
    if(this.utilisateurs) {
      let userFound = this.utilisateurs.findIndex(user => user.id == user.id);
      if (userFound != undefined) {
        this.utilisateurs.splice(userFound, 1);
        this.dataSource.data = this.utilisateurs;
        this._snackBar.open(this.messageKeys.DELETE_CLIENT, 'OK');
      }
    }
  }

}
