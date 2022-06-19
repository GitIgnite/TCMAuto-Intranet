import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ApiUrlConst} from "src/environments/path/api-url-const";
import {Vehicule} from "../models/Vehicule";
import {HttpService} from "./http/http.service";
import {GenericRequest} from "./http/generic-request.service";
import {HttpParams} from "@angular/common/http";
import {ClientService} from "./client.service";

@Injectable()
export class DocumentService {

  private readonly urlDocument = ApiUrlConst.DOCUMENT;

  constructor(private readonly http: HttpService, private clientService: ClientService) {
  }

  public generateContratPdf(id: string | undefined): Observable<any> {
    let url = `${this.urlDocument}/generateContratPdf`;
    const datas: any = {};
    datas['id'] = id;

    return this.http.get(GenericRequest.buildSearchRequest(url, undefined, undefined, datas, undefined, 'blob'));

  }

}
