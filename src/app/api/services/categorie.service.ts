import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ApiUrlConst} from "src/environments/path/api-url-const";
import {HttpService} from "./http/http.service";
import {GenericRequest} from "./http/generic-request.service";

@Injectable()
export class CategorieService {

  private readonly urlCategorie = ApiUrlConst.CATEGORIE;

  constructor(private readonly http:HttpService) {
  }

  public getCategories(): Observable<any>{
    const url = `${this.urlCategorie}/all`
    return this.http.get(GenericRequest.buildSearchRequest(url));
  }
}
