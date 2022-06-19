import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ApiUrlConst} from "src/environments/path/api-url-const";
import {HttpService} from "./http/http.service";
import {GenericRequest} from "./http/generic-request.service";

@Injectable()
export class ModeleService {

  private readonly urlModele = ApiUrlConst.MODELE;
  private readonly urlMarque = ApiUrlConst.MARQUE;

  constructor(private readonly http:HttpService) {
  }

  public getModeleAll(): Observable<any>{
    const url = `${this.urlModele}`
    return this.http.get(GenericRequest.buildSearchRequest(url));
  }

  public getMarqueAll(): Observable<any>{
    const url = `${this.urlMarque}`
    return this.http.get(GenericRequest.buildSearchRequest(url));
  }

  public getModeleByMarqueId(marqueId: string): Observable<any> {
    const url = `${this.urlModele}/${marqueId}`
    return this.http.get<any>(GenericRequest.buildSearchRequest(url))
  }
}
