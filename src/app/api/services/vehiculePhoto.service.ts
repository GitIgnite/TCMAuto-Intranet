import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiUrlConst} from 'src/environments/path/api-url-const';
import {FileImage} from '../models/FileImage';
import {environment} from "../../../environments/environment";
import {HttpService} from "./http/http.service";
import {GenericRequest} from "./http/generic-request.service";

@Injectable()
export class VehiculePhotoService {

  private readonly urlVehiculePhoto = ApiUrlConst.VEHICULE_PHOTO;

  constructor(private http: HttpClient, private httpCustom: HttpService) {}

  public upload(image: File, vehiculeId: string): Observable<any>{
    let url = `${environment.backendServer}/tcmauto${this.urlVehiculePhoto}/upload` ;
    var file = new FormData();
    file.append('file',image);
    let param: HttpParams = new HttpParams()
      .set('vehiculeId', vehiculeId);
    return this.http.post<any>(url,file,{params:param});
  }

  public getPhotoByIdVehicule(idVehicule: string) : Observable<any>{
    let url = `${this.urlVehiculePhoto}/all` ;
    return this.httpCustom.get(GenericRequest.buildSearchRequest(url, undefined, undefined, {'vehiculeId': idVehicule}));
  }
}
