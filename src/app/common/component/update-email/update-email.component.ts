import {Component, Inject, OnInit} from '@angular/core';
import {UtilisateurFormKeys} from "../../form/keys/utilisateur-form-keys";
import {MessageKeys} from "../../form/keys/message-keys";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Utilisateur} from "../../../api/models/Utilisateur";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../../authentification/auth.service";
import {TokenStorageService} from "../../../authentification/token.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PATTERN_EMAIL} from "../../form/validators/patterns";

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
  userToUpdate?: Utilisateur;

  constructor(private readonly fb: UntypedFormBuilder,
              public dialogRef: MatDialogRef<UpdateEmailComponent>,
              private readonly authService: AuthService,
              private readonly tokenStorageService: TokenStorageService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private readonly _snackBar: MatSnackBar) {
    if(data && data.user) {
      this.userToUpdate = data.user;
    }
  }

  ngOnInit(): void {
    this.initBuildUpdateEmailForm();
    this.connectedUser = this.tokenStorageService.getUser();
  }

  initBuildUpdateEmailForm(): void {
    this.updateEmailForm = this.fb.group({
      [this.utilisateurFormKeys.NEW_EMAIL]: [this.userToUpdate?.email, [Validators.required, Validators.pattern(PATTERN_EMAIL)]],
    });
  }

  updateEmail() {
    let emailUpdate = this.updateEmailForm.value;

    emailUpdate.username = this.userToUpdate?.username ? this.userToUpdate.username : this.connectedUser?.username;
    this.authService.updateEmail(this.updateEmailForm.value).subscribe(user => {
        this._snackBar.open(this.messageKeys.USER_EMAIL_UPDATED, 'OK')
        this.dialogRef.close({userUpdated: user});
      },
      error => {
        this._snackBar.open(error, 'Erreur')
      })
  }

  cancelAndCloseComponent() {
    this.dialogRef.close(null);
  }

}
