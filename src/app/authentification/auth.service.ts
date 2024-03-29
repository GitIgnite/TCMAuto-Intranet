import {Injectable} from "@angular/core";
import {HttpService} from "../api/services/http/http.service";
import {ApiUrlConst} from "../../environments/path/api-url-const";
import {GenericRequest} from "../api/services/http/generic-request.service";
import {Observable} from "rxjs";
import {TokenStorageService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http:HttpService, private readonly tokenStorage : TokenStorageService) { }

  /**
   * Permet l'authentification auprès du back-end.
   * @param login Le login.
   *
   * @returns true si l'authentification s'est bien déroulée, false sinon.
   */
  login(login: any): Observable<any> {
    return this.http.post<any>(GenericRequest.buildSendRequest(ApiUrlConst.AUTH + '/login',login));
  }

}
