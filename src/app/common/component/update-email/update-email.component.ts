import {Component, OnInit} from '@angular/core';
import {UtilisateurFormKeys} from "../../form/keys/utilisateur-form-keys";
import {MessageKeys} from "../../form/keys/message-keys";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Utilisateur} from "../../../api/models/Utilisateur";
import {MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../../authentification/auth.service";
import {TokenStorageService} from "../../../authentification/token.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {confirmedValidator} from "../../form/validators/confirmed.validator";

@Component({
  selector: 'app-update-email',
  templateUrl: './update-email.component.html',
  styleUrls: ['./update-email.component.scss']
})
export class UpdateEmailComponent implements OnInit {

  utilisateurFormKeys = UtilisateurFormKeys;
  messageKeys = MessageKeys;
  updateEmailForm!: UntypedFormGroup;
  connectedUser?: Utilisateur;

  constructor(private readonly fb: UntypedFormBuilder,
              public dialogRef: MatDialogRef<UpdateEmailComponent>,
              private readonly authService: AuthService,
              private readonly tokenStorageService: TokenStorageService,
              private readonly _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  initBuildUpdatePasswordForm(): void {
    this.updateEmailForm = this.fb.group({
      [this.utilisateurFormKeys.NEW_EMAIL]: [null, [Validators.required]],
    });
  }

  updatePassword() {
    let passworUpdate = this.updatePasswordForm.value;
    passworUpdate.username = this.connectedUser?.username;
    this.authService.updatePassword(this.updatePasswordForm.value).subscribe(() => {
        console.log("retour update password", 'OK')
        this._snackBar.open(this.messageKeys.UTILISATEUR_PASSWORD_UPDATED, 'OK')
        this.dialogRef.close(null);
      },
      error => {
        console.log("erreur")
        this._snackBar.open(error, 'Erreur')
      })
  }

  cancelAndCloseComponent() {
    this.dialogRef.close(null);
  }

}
