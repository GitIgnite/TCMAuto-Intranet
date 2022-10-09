import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {VehiculePhotoService} from "../../api/services/vehiculePhoto.service";
import {VehiculePhoto} from "../../api/models/vehiculePhoto";
import {asyncScheduler, Observable, of, scheduled} from "rxjs";

@Component({
  selector: 'app-vehicule-photo',
  templateUrl: './vehicule-gestion-photo.component.html',
  styleUrls: ['./vehicule-gestion-photo.component.scss']
})
export class VehiculeGestionPhotoComponent implements OnInit {

  public showOrderPicture: boolean = true;
  public showAddpicture: boolean = false;
  public image: any;
  public photos: VehiculePhoto[] = [];
  public photosEnBase: VehiculePhoto[] = [];
  public vehiculeId :string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private vehiculePhotoService: VehiculePhotoService,
              public dialogRef: MatDialogRef<VehiculeGestionPhotoComponent>) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    if(this.data && this.data.photos) {
      this.vehiculeId = this.data.vehiculeId;
      this.photos = this.data.photos;
      this.photosEnBase = this.photos;
    }
  }

  titreSelectionne(value: number) {
    this.showOrderPicture = value == 1 ? true : false;
    this.showAddpicture = value == 2 ? true : false;
  }

  addImage(photo: VehiculePhoto) {
    this.photos = this.photos.concat(photo);
  }
  changeImageListEvent(photos: any[]) {
    this.photos = photos;
  }

  close() {
    this.dialogRef.close(null);
  }

  enregistrerOrdonnerImage() {
    new Observable().pipe(() => this.save()).subscribe(() => {
      console.log("test passage apres save")
      this.photos = this.photos.sort((a, b) => a.ordre && b.ordre ? a.ordre - b.ordre : 0);
      this.dialogRef.close(this.photos);
    })
  }

  save(){
    this.photos.forEach((photo) => {
      this.photosEnBase.forEach((photoEnBase: VehiculePhoto) => {
        if (photo.ordre &&  photo.id == photoEnBase.id && photo.ordre != photoEnBase) {
          if(photoEnBase.id) {
            this.vehiculePhotoService.updateVehiculePhoto(photoEnBase.id, photo.ordre).subscribe({})
          }
        }
      })
    })

    console.log("test save")
    return scheduled(this.photos, asyncScheduler);
  }
}
