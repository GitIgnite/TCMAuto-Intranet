import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
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

  @Input()
  isCreateUser: boolean = false;

  @Output() updateRolesInCreateComponent = new EventEmitter<any>();

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
    this.initBuildForm();
    this.connectedUser = this.tokenStorageService.getUser();
    this.onChange();
  }

  onChange() {
    if(this.isCreateUser) {
      this.updateRoleForm.statusChanges.subscribe(
        result => this.updateRolesInCreateComponent.emit(this.updateRoleForm.value)
      );
    }
  }

  initBuildForm() {
    this.updateRoleForm = this.fb.group({});
    this.roles.forEach((role: any) => {
      this.updateRoleForm.addControl(role.name, new FormControl(this.getDefaultValue(role), Validators.required));
    })
    this.updateRolesInCreateComponent.emit(this.updateRoleForm.value);
  }

  getDefaultValue(role: any) {
    if(this.isCreateUser && role.name == 'UTILISATEUR') {
      return true;
    }
    return !!this.user?.roles?.find(roleUser => roleUser.name == role.name);
  }

  updateRoles() {
    let rolesFormValues: any = this.updateRoleForm.value;

    let roles = this.roles.filter(role => rolesFormValues[role.name]);

    let username = this.user && this.user.username ? this.user.username : this.connectedUser?.username;

    if (username) {
      this.authService.updateRole(roles, username).subscribe(userUpdated => {
          this.user = userUpdated;
          this._snackBar.open(this.messageKeys.USER_ROLE_UPDATED, 'OK');
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
