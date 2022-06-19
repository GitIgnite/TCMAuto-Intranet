import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiUrlConst } from "src/environments/path/api-url-const";
import { HttpService } from "./http/http.service";
import { GenericRequest } from "./http/generic-request.service";
import { VehiculeEquipement } from "../models/VehiculeEquipement";

@Injectable()
export class VehiculeEquipementService {

  private readonly urlVehiculeEquipement = ApiUrlConst.VEHICULE_EQUIPEMENT;

  constructor(private readonly http: HttpService) {
  }

  public getEquipementByVehiculeId(vehiculeId: string): Observable<any> {
    const url = `${this.urlVehiculeEquipement}/${vehiculeId}`
    return this.http.get(GenericRequest.buildSearchRequest(url));
  }

  public addEquipementByVehicule(vehiculeEquipement: VehiculeEquipement): Observable<VehiculeEquipement> {
    const url = `${this.urlVehiculeEquipement}/addEquipement`;
    return this.http.post<VehiculeEquipement>(GenericRequest.buildSendRequest(url, vehiculeEquipement));
  }


  public deleteVehiculeEquipementByids(vehiculeEquipement: VehiculeEquipement): Observable<any>{
    const url = `${this.urlVehiculeEquipement}/deleteVehiculeEquipement`;
    return this.http.post(GenericRequest.buildSendRequest(url, vehiculeEquipement));
  }
}
