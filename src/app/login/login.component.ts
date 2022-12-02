import {Component, OnInit} from '@angular/core';
import {AuthService} from "../authentification/auth.service";
import {TokenStorageService} from "../authentification/token.service";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {LoginFormKey} from "../common/form/keys/login-form-key";
import {finalize} from "rxjs/operators";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm! : UntypedFormGroup;
  loginFormKey = LoginFormKey;

  private readonly loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private readonly fb: UntypedFormBuilder,
              private readonly _snackBar: MatSnackBar,
              private readonly router: Router) { }

  ngOnInit(): void {
    this.initLoginForm();
  }
  initLoginForm() {
    this.loginForm = this.fb.group( {
      [this.loginFormKey.USERNAME] : ["",[Validators.required]],
      [this.loginFormKey.PASSWORD] : ["",[Validators.required]]
    })
  }
  onSubmit(): void {
    this.authService.login(this.loginForm.value).subscribe(
      (data: any) => {
        console.log("login : " + data )
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.router.navigate(['/vehicule']);
      },
      err => {
        this._snackBar.open(err.error.message);
      }
    );
  }

}
