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

  listeUtilisateur(): Observable<any> {
    return this.http.get<any>(GenericRequest.buildSearchRequest(ApiUrlConst.AUTH + '/liste'))
  }

  updatePassword(mapUpdate: any): Observable<any> {
    const url = ApiUrlConst.AUTH+'/updatePassword';
    return this.http.patch<any>(GenericRequest.buildSendRequest(url,mapUpdate));
  }

  updateEmail(mapUpdate: any): Observable<any> {
    const url = ApiUrlConst.AUTH+'/updateEmail';
    return this.http.patch<any>(GenericRequest.buildSendRequest(url,mapUpdate));
  }

  updateRole(mapUpdate: any[], username: string): Observable<any> {
    const url = ApiUrlConst.AUTH+'/updateRole';
    return this.http.patch<any>(GenericRequest.buildSendRequest(url,mapUpdate,{'username': username}));
  }

  public deleteUser(id: string): Observable<any> {
    const url = `${ApiUrlConst.AUTH}/delete/${id}`;
    console.log("service delete")
    return this.http.delete<any>(GenericRequest.buildSendRequest(url));
  }

  public getRoles(): Observable<any> {
    const url = `${ApiUrlConst.AUTH}/roles`;
    return this.http.get<any>(GenericRequest.buildSendRequest(url));
  }

}
