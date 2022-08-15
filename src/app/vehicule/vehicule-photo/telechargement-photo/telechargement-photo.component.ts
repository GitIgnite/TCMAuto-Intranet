import { HttpEventType, HttpResponse } from '@angular/common/http';
import {Component, Input, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { FileImage } from 'src/app/api/models/FileImage';
import { VehiculePhotoService } from 'src/app/api/services/vehiculePhoto.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MessageKeys} from "../../../common/form/keys/message-keys";
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

  selectedFiles?: FileList;
  currentFile?: File;
  fileImage!: FileImage
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;
  messageErrorKeys = MessageErrorKeys
  @Input()
  vehiculeId :string = '';

  constructor(private imageService: VehiculePhotoService,
              private readonly _snackBar: MatSnackBar){
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    console.log("Upload image !!!!")
    this.progress = 0;
    console.log("Uplaod file")
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file && this.vehiculeId) {
        this.currentFile = file;
        this.imageService.upload(this.currentFile, this.vehiculeId).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              //this.fileInfos = this.imageService.getFiles();
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
            this.currentFile = undefined;
          });
      } else {
        if(!this.vehiculeId) {
          this._snackBar.open(this.messageErrorKeys.ERREUR_UPLOAD_IMAGE_ID_VEHICULE_NULL, 'Erreur');
        } else {
          this._snackBar.open(this.messageErrorKeys.ERREUR_UPLOAD_AUCUNE_IMAGE_SELECTIONNEE, 'Erreur');
        }
      }
      this.selectedFiles = undefined;
    }
  }
}
