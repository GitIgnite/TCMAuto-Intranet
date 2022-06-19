import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiUrlConst } from "src/environments/path/api-url-const";
import { HttpService } from "./http/http.service";
import { GenericRequest } from "./http/generic-request.service";
import { Equipement } from "../models/Equipement";

@Injectable()
export class EquipementService {

  private readonly urlEquipement = ApiUrlConst.EQUIPEMENT;
  private readonly urlGroupeEquipement = ApiUrlConst.GROUPE_EQUIPEMENT;

  constructor(private readonly http: HttpService) {
  }

  public getEquipementAll(): Observable<any> {
    const url = `${this.urlEquipement}`
    return this.http.get(GenericRequest.buildSearchRequest(url));
  }

  public getEquipementByGroupeEquipementId(groupeEquipementId: string): Observable<any> {
    const url = `${this.urlEquipement}/${groupeEquipementId}`
    return this.http.get<any>(GenericRequest.buildSearchRequest(url));
  }

  public getGroupeEquipementAll(): Observable<any> {
    const url = `${this.urlGroupeEquipement}`
    return this.http.get(GenericRequest.buildSearchRequest(url));
  }

  public getEquipementByListGroupeEquipementId(groupeEquipementIds: string[]): Observable<any> {
    const url = `${this.urlEquipement}/${groupeEquipementIds}`
    return this.http.get<any>(GenericRequest.buildSearchRequest(url));
  }

  public createEquipement(equipement: Equipement): Observable<Equipement> {
    const url = `${this.urlEquipement}/create`;
    return this.http.post<Equipement>(GenericRequest.buildSendRequest(url, equipement));
  }
}
