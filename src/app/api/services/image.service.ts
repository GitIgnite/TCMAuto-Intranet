import {HttpClient, HttpEvent, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrlConst } from 'src/environments/path/api-url-const';
import { FileImage } from '../models/FileImage';
import { GenericRequest } from './http/generic-request.service';
import { HttpService } from './http/http.service';

@Injectable()
export class ImageService {

  private readonly urlVehiculePhoto = ApiUrlConst.VEHICULE_PHOTO;

  constructor(private http: HttpClient) {}

  public upload(fileImage: FileImage): Observable<any>{
    console.log("Service upload image")
    const url = `${this.urlVehiculePhoto}/upload`
    var file = new FormData();
    // var headers = new HttpHeaders()
    //   .set('Content-Type', 'multipart/form-data');
    // var headers = new Map()
    //   .set('Content-Type', 'multipart/form-data');
    var image: File = fileImage.file;
    file.append('file',image);
    let url1 = 'http://localhost:8080/tcmauto' + url ;
    // return this.http.post<any>(GenericRequest.buildSendRequest( url, file,null, headers));
    return this.http.post<any>(url1,file);
    // return this.http.post<any>(url,null);
  }

}
