import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ApiUrlConst} from "src/environments/path/api-url-const";
import {Vehicule} from "../models/Vehicule";
import {HttpService} from "./http/http.service";
import {GenericRequest} from "./http/generic-request.service";
import {Sort} from "@angular/material/sort";
import {HttpParams} from "@angular/common/http";
import {VehiculePhoto} from "../models/vehiculePhoto";

@Injectable()
export class VehiculeService {

  private readonly urlVehicule = ApiUrlConst.VEHICULE;

  constructor(private readonly httpCustom: HttpService) {
  }

  public getAll(): Observable<any>{
    const url = `${this.urlVehicule}/all`;
    return this.httpCustom.get(GenericRequest.buildSearchRequest(url));
  }

  public createVehicule(vehicule: Vehicule): Observable<Vehicule> {
    const url = `${this.urlVehicule}/create`;
    return this.httpCustom.post<Vehicule>(GenericRequest.buildSendRequest(url,vehicule));
  }

  public getVehiculeByRecherche(vehiculeSearchFormDatas: any, sort: Sort, pageSize: number, pageIndex: number): Observable<any>{
    const url = `${this.urlVehicule}/recherche`;
    return this.httpCustom.get(GenericRequest.buildSearchRequest(url, pageIndex, pageSize, vehiculeSearchFormDatas, sort));
  }

  public updateVehicule(id: string | undefined, mapUpdate: any): Observable<Vehicule> {
    if(id) {
      const url = `${this.urlVehicule}/${id}`;
      return this.httpCustom.patch<Vehicule>(GenericRequest.buildSendRequest(url,mapUpdate));
    }
    return new Observable<Vehicule>();
  }
}
