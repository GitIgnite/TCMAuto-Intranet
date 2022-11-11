import {Component, OnInit} from '@angular/core';
import {UtilisateurFormKeys} from "../../form/keys/utilisateur-form-keys";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {confirmedValidator} from "../../form/validators/confirmed.validator";
import {MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../../authentification/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Utilisateur} from "../../../api/models/Utilisateur";

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {

  utilisateurFormKeys = UtilisateurFormKeys;
  updatePasswordForm!: UntypedFormGroup;
  connectedUser: Utilisateur;
  constructor(private readonly fb: UntypedFormBuilder,
              public dialogRef: MatDialogRef<UpdatePasswordComponent>,
              private readonly authService: AuthService,
              private readonly _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.initBuildUpdatePasswordForm();
    this.authService.
  }

  initBuildUpdatePasswordForm(): void {
    this.updatePasswordForm = this.fb.group({
      [this.utilisateurFormKeys.OLD_PASSWORD]: [null, [Validators.required]],
      [this.utilisateurFormKeys.NEW_PASSWORD]: [null, [Validators.required, confirmedValidator(this.utilisateurFormKeys.NEW_PASSWORD_CONFIRM, true)]],
      [this.utilisateurFormKeys.NEW_PASSWORD_CONFIRM]: [null, [Validators.required, confirmedValidator(this.utilisateurFormKeys.NEW_PASSWORD)]]
    });
  }

  updatePassword() {
    this.authService.updatePassword(this.updatePasswordForm.value).subscribe(() => {
      console.log("retour update password")
    },
      error => {
        this._snackBar.openFromComponent(error)
      })
  }

  cancelAndCloseComponent() {
    this.dialogRef.close(null);
  }
}
