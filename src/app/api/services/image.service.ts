import { HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrlConst } from 'src/environments/path/api-url-const';
import { FileImage } from '../models/FileImage';
import { GenericRequest } from './http/generic-request.service';
import { HttpService } from './http/http.service';

@Injectable()
export class ImageService {

  private readonly urlVehiculePhoto = ApiUrlConst.VEHICULE_PHOTO;

  constructor(private http: HttpService) {}

  public upload(fileImage: FileImage): Observable<any>{
    console.log("Service upload image")
    const url = `${this.urlVehiculePhoto}/upload`
    return this.http.post<any>(GenericRequest.buildSendRequest( url, fileImage));
  }

}
