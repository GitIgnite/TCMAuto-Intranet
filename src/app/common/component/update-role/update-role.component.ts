import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Utilisateur} from "../../../api/models/Utilisateur";
import {FormControl, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../authentification/auth.service";
import {TokenStorageService} from "../../../authentification/token.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MessageKeys} from "../../form/keys/message-keys";

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.scss']
})
export class UpdateRoleComponent implements OnInit {

  roles: any[] = [];
  user ?: Utilisateur;
  updateRoleForm!: UntypedFormGroup;
  connectedUser?: Utilisateur;
  messageKeys = MessageKeys;

  constructor(private readonly fb: UntypedFormBuilder,
              public dialogRef: MatDialogRef<UpdateRoleComponent>,
              private readonly tokenStorageService: TokenStorageService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private readonly authService: AuthService,
              private readonly _snackBar: MatSnackBar) {
    if (data) {
      if (data.user) {
        this.user = data.user;
      }

      if (data.roles) {
        this.roles = data.roles;
      }
    }
  }

  ngOnInit(): void {
    this.updateRoleForm = this.fb.group({});
    this.roles.forEach((role: any) => {
      this.updateRoleForm.addControl(role.name, new FormControl(!!this.user?.roles?.find(roleUser => roleUser.name == role.name), Validators.required));
    })
    this.connectedUser = this.tokenStorageService.getUser();
  }

  updateRoles() {
    let rolesFormValues: any = this.updateRoleForm.value;
    let updateUser: any = {};
    updateUser.newRoles = [];
    console.log("test update role")
    let roles = this.roles.filter(role => rolesFormValues[role.name])
    let username = this.user && this.user.username ? this.user.username : this.connectedUser?.username;

    if (username) {
      this.authService.updateRole(roles, username).subscribe(userUpdated => {
          this.user = userUpdated;
          this._snackBar.open(this.messageKeys.UTILISATEUR_ROLE_UPDATED, 'OK');
          this.dialogRef.close({userUpdated: this.user});
        },
        error => {
          this._snackBar.open(error, 'Erreur')
        });
    }
  }

  cancelAndCloseComponent() {
    this.dialogRef.close(null);
  }

}
