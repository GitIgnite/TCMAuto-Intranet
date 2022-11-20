import {Component, Inject, OnInit} from '@angular/core';
import {UtilisateurFormKeys} from "../../form/keys/utilisateur-form-keys";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {confirmedValidator} from "../../form/validators/confirmed.validator";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../../authentification/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Utilisateur} from "../../../api/models/Utilisateur";
import {TokenStorageService} from "../../../authentification/token.service";
import {MessageKeys} from "../../form/keys/message-keys";

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {

  utilisateurFormKeys = UtilisateurFormKeys;
  messageKeys = MessageKeys;
  updatePasswordForm!: UntypedFormGroup;
  connectedUser?: Utilisateur;
  usernameToUpdate?: string;

  constructor(private readonly fb: UntypedFormBuilder,
              public dialogRef: MatDialogRef<UpdatePasswordComponent>,
              private readonly authService: AuthService,
              private readonly tokenStorageService: TokenStorageService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private readonly _snackBar: MatSnackBar) {
    if(data && data.username) {
      this.usernameToUpdate = data.username;
    }
  }

  ngOnInit(): void {
    this.initBuildUpdatePasswordForm();
    this.connectedUser = this.tokenStorageService.getUser();
  }

  initBuildUpdatePasswordForm(): void {
    this.updatePasswordForm = this.fb.group({
      [this.utilisateurFormKeys.OLD_PASSWORD]: [null, [Validators.required]],
      [this.utilisateurFormKeys.NEW_PASSWORD]: [null, [Validators.required, confirmedValidator(this.utilisateurFormKeys.NEW_PASSWORD_CONFIRM, true)]],
      [this.utilisateurFormKeys.NEW_PASSWORD_CONFIRM]: [null, [Validators.required, confirmedValidator(this.utilisateurFormKeys.NEW_PASSWORD)]]
    });
  }

  updatePassword() {
    let passworUpdate = this.updatePasswordForm.value;

     passworUpdate.username = this.usernameToUpdate ? this.usernameToUpdate : this.connectedUser?.username;

    this.authService.updatePassword(this.updatePasswordForm.value).subscribe(() => {
        this._snackBar.open(this.messageKeys.UTILISATEUR_PASSWORD_UPDATED, 'OK')
        this.dialogRef.close(null);
      },
      error => {
        this._snackBar.open(error, 'Erreur')
      })
  }

  cancelAndCloseComponent() {
    this.dialogRef.close(null);
  }
}
