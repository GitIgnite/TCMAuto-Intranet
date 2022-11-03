import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ApiUrlConst} from "src/environments/path/api-url-const";
import {Client} from "../models/Client";
import {HttpService} from "./http/http.service";
import {GenericRequest} from "./http/generic-request.service";
import {Sort} from "@angular/material/sort";


@Injectable()
export class ClientService {

  private readonly urlClient = ApiUrlConst.CLIENT;

  constructor(private readonly http: HttpService) {
  }

  public getAll(): Observable<any>{
    const url = `${this.urlClient}/all`;
    return this.http.get(GenericRequest.buildSearchRequest(url));
  }

  public getClientByRecherche(clientSearchFormDatas: any, sort: Sort, pageSize: number, pageIndex: number): Observable<any>{
    const url = `${this.urlClient}/recherche`;
    return this.http.get(GenericRequest.buildSearchRequest(url, pageIndex, pageSize, clientSearchFormDatas, sort));
  }

  public createClient(client: Client): Observable<Client> {
    const url = `${this.urlClient}/create`;
    return this.http.post<Client>(GenericRequest.buildSendRequest(url,client));
  }

  public updateClient(id: string, mapUpdate: any): Observable<Client> {
    const url = `${this.urlClient}/${id}`;
    return this.http.patch<Client>(GenericRequest.buildSendRequest(url,mapUpdate));
  }

  public deleteClient(id: string): Observable<Client> {
    const url = `${this.urlClient}/${id}`;
    return this.http.delete<Client>(GenericRequest.buildSendRequest(url));
  }

}
