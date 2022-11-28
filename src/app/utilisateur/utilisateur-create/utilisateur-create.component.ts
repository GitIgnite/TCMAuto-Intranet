import {Component, Inject, OnInit} from '@angular/core';
import {UtilisateurFormKeys} from "../../common/form/keys/utilisateur-form-keys";
import {MessageKeys} from "../../common/form/keys/message-keys";
import {FormGroup, UntypedFormBuilder, Validators} from "@angular/forms";
import {Utilisateur} from "../../api/models/Utilisateur";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ClientCreateComponent} from "../../client/client-create/client-create.component";
import {AuthService} from "../../authentification/auth.service";
import {confirmedValidator} from "../../common/form/validators/confirmed.validator";
import {UserCreate} from "../../api/models/userCreate";

@Component({
  selector: 'app-utilisateur-create',
  templateUrl: './utilisateur-create.component.html',
  styleUrls: ['./utilisateur-create.component.scss']
})
export class UtilisateurCreateComponent implements OnInit {

  utilisateurFormKeys = UtilisateurFormKeys;
  messageKeys = MessageKeys;
  createUserForm!: FormGroup;
  connectedUser?: Utilisateur;
  userToCreate?: Utilisateur;

  roles?: any[];
  rolesUser ?: any;
  constructor(public dialogRef: MatDialogRef<ClientCreateComponent>,
              private readonly fb: UntypedFormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.initBuildCreateUserForm();
    if(this.data.roles) {
      this.roles = this.data.roles;
    }
    console.log("create user")
  }

  initBuildCreateUserForm(): void {
    this.createUserForm = this.fb.group({
      [this.utilisateurFormKeys.USERNAME]: [null, [Validators.required]],
      [this.utilisateurFormKeys.EMAIL]: [null, [Validators.required]],
      [this.utilisateurFormKeys.PASSWORD]: [null, [Validators.required, confirmedValidator(this.utilisateurFormKeys.PASSWORD_CONFIRM, true)]],
      [this.utilisateurFormKeys.PASSWORD_CONFIRM]: [null, [Validators.required, confirmedValidator(this.utilisateurFormKeys.PASSWORD)]]
    });
  }


  cancelCreationUser(): void {
    this.dialogRef.close({
    })
  }

  createUser(): void {
    this.userToCreate = new UserCreate();
    this.userToCreate = this.createUserForm.value;
    if(this.userToCreate) {
      if(this.roles) {
        this.userToCreate.roles = this.roles.filter(role => this.rolesUser && this.rolesUser[role.name])
      }

      this.authService.createUser(this.userToCreate).pipe().subscribe(user => {
        this.dialogRef.close({
          objet:user
        })
      })
    }
  }

  updateRole(roles: any): void {
    this.rolesUser = roles;
  }
}
