import {HttpResponse} from '@angular/common/http';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {VehiculePhotoService} from 'src/app/api/services/vehiculePhoto.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MessageErrorKeys} from "../../../common/form/keys/message-error-keys";
import {MessageKeys} from 'src/app/common/form/keys/message-keys';
import {VehiculePhoto} from "../../../api/models/vehiculePhoto";

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-telechargement-photo',
  templateUrl: './telechargement-photo.component.html',
  styleUrls: ['./telechargement-photo.component.scss']
})

export class TelechargementPhotoComponent {

  @Input()
  vehiculeId :string = '';

  @Output() addImageEmitter = new EventEmitter<VehiculePhoto>();

  selectedFiles!: FileList;
  photoLenght: number = 0;
  progressInfos: any[] = [];
  photos: any[] = [];
  message = '';
  messageErrorKeys = MessageErrorKeys
  messageKeys = MessageKeys

  constructor(private imageService: VehiculePhotoService,
              private readonly _snackBar: MatSnackBar, private vehiculePhotoService: VehiculePhotoService){
  }

  ngOnInit(): void {
    this.vehiculePhotoService.getPhotoByIdVehicule(this.vehiculeId).subscribe(photos => {
      this.photos = photos;
      this.photoLenght = photos.length;
    })
  }

  selectFiles(event: any): void {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }

  uploadFiles(): void {
    for (let i = 0; i < this.selectedFiles.length; i++) {

      this.upload(i+1, this.selectedFiles[i]);
    }

  }

  upload(idx: number, file: File): void {
    if (this.selectedFiles) {
      this.progressInfos[idx] = { value: 0, fileName: file.name };
        if (file && this.vehiculeId) {
          this.imageService.upload(file, this.vehiculeId, this.photoLenght+idx).subscribe(
            (vehiculePhoto: VehiculePhoto) => {
              if (vehiculePhoto) {
                this.progressInfos[idx] = {value: 100};
                this._snackBar.open(this.messageKeys.SUCCES_UPLOAD, 'succes', {
                  duration: 1500
                });
                console.log("vehicule uplaod emit new vehicule")
                this.addImageEmitter.emit(vehiculePhoto);
              }
            },
            (err: any) => {
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
