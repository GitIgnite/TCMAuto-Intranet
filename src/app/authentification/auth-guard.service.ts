import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {TokenStorageService} from "./token.service";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public tokenService: TokenStorageService, public router: Router) {}
  canActivate(): boolean {
    if (!this.tokenService.isConnected()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
