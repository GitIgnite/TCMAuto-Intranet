import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  public  userConnected = new BehaviorSubject<any>(this.getUser());
  constructor() { }
  signOut(): void {
    window.sessionStorage.clear();
    this.userConnected.next(null);
  }
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string | null {
    let token = window.sessionStorage.getItem(TOKEN_KEY);
    return token;

  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    this.userConnected.next(user);
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  public isConnected() : boolean {
    return this.getToken() != null;
  }
}
