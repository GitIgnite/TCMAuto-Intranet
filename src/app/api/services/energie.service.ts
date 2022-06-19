import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ApiUrlConst} from "src/environments/path/api-url-const";
import {HttpService} from "./http/http.service";
import {GenericRequest} from "./http/generic-request.service";

@Injectable()
export class EnergieService {

  private readonly urlEnergie = ApiUrlConst.ENERGIE;

  constructor(private readonly http: HttpService) {
  }

  public getEnergies(): Observable<any>{
    const url = `${this.urlEnergie}/all`
    return this.http.get(GenericRequest.buildSearchRequest(url));
  }
}
