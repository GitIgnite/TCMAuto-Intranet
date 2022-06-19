import {Injectable} from "@angular/core";
import {ApiUrlConst} from "../../../environments/path/api-url-const";
import {HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Adresse} from "../models/Adresse";
import {GenericRequest} from "./http/generic-request.service";
import {HttpService} from "./http/http.service";

@Injectable()
export class AdresseService {

  private readonly urlAdresse = ApiUrlConst.ADRESSE;

  constructor(private readonly http:HttpService) {
  }

  public searchAdresse(adresse: string): Observable<Adresse[]>{
    const url = `${this.urlAdresse}/recherche`
    let params = new HttpParams()
      .set("adresse", adresse);
    return this.http.get(GenericRequest.buildSearchRequest(url,undefined, undefined,params));
  }
}
