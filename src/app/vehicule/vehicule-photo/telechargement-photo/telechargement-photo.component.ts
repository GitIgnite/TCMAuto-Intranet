import { HttpResponse } from '@angular/common/http';
import {Component, Input} from '@angular/core';
import { Observable } from 'rxjs';
import { FileImage } from 'src/app/api/models/FileImage';
import { VehiculePhotoService } from 'src/app/api/services/vehiculePhoto.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MessageErrorKeys} from "../../../common/form/keys/message-error-keys";

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-telechargement-photo',
  templateUrl: './telechargement-photo.component.html',
  styleUrls: ['./telechargement-photo.component.scss']
})

export class TelechargementPhotoComponent {

  selectedFiles!: FileList;
  currentFile?: File;
  fileImage!: FileImage;
  progressInfos: any[] = [];
  message = '';
  fileInfos?: Observable<any>;
  messageErrorKeys = MessageErrorKeys
  @Input()
  vehiculeId :string = '';
  orderPhoto!: number

  constructor(private imageService: VehiculePhotoService,
              private readonly _snackBar: MatSnackBar){
  }

  ngOnInit(): void {
  }

  selectFiles(event: any): void {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }

  uploadFiles(): void {
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }

    console.log("Upload file after for");
  }

  upload(idx: number, file: File): void {
    console.log("Upload file");
    if (this.selectedFiles) {
      this.progressInfos[idx] = { value: 0, fileName: file.name };
        if (file && this.vehiculeId) {
          this.imageService.upload(file, this.vehiculeId).subscribe(
            (event: any) => {
              if (event.message) {
                this.progressInfos[idx] = {value: Math.round(100 * event.loaded / event.total)};
                this._snackBar.open(this.messageErrorKeys.SUCCES_UPLOAD, 'succes', {
                  duration: 1500
                });
              } else if (event instanceof HttpResponse) {
                this.message = event.body.message;
                //this.imageService.getPhotoByIdVehicule(this.vehiculeId)
              }
            },
            (err: any) => {
              console.log(err);
              this.progressInfos[idx] = {value: 0};
              if (err.error && err.error.message) {
                this.message = err.error.message;
              } else {
                this.message = 'Impossible d\'upload ce fichier: '+ file.name + ' !';
              }
            });
        } else {
          if(!this.vehiculeId) {
            this._snackBar.open(this.messageErrorKeys.ERREUR_UPLOAD_IMAGE_ID_VEHICULE_NULL, 'Erreur');
          } else {
            this._snackBar.open(this.messageErrorKeys.ERREUR_UPLOAD_AUCUNE_IMAGE_SELECTIONNEE, 'Erreur');
          }
        }
    }
  }
}
