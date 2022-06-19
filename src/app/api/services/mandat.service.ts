import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ApiUrlConst} from "src/environments/path/api-url-const";
import {Mandat} from "../models/Mandat";
import {HttpService} from "./http/http.service";
import {GenericRequest} from "./http/generic-request.service";
import {HttpParams} from "@angular/common/http";

@Injectable()
export class MandatService {

  private readonly urlMandat = ApiUrlConst.MANDAT;

  constructor(private readonly http: HttpService) {
  }

  public createMandat(mandat: Mandat): Observable<Mandat> {
    const url = `${this.urlMandat}/create`;
    return this.http.post<Mandat>(GenericRequest.buildSendRequest(url,mandat));
  }

  public getMandatByVehicule(vehiculeId: string): Observable<Mandat> {
    const url = `${this.urlMandat}/byVehicule/${vehiculeId}`;
    return this.http.get<Mandat>(GenericRequest.buildSearchRequest(url));
  }
}
