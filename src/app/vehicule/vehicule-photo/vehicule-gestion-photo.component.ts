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
  public photosToDelete: VehiculePhoto[] = [];
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

  changeImagesToDeleteEvent(photosToDelete: any[]) {
    this.photosToDelete = photosToDelete;
  }

  close() {
    this.dialogRef.close(null);
  }

  enregistrerOrdonnerImage() {
    let confirmSaveAndClose: boolean = true;
    // Si des éléments sont à supprimer alors on demande validation à l'utilsateur
    // S'il accepte, alors on supprime les photos et on sauvegarde l'odre
    // Sinon on sauvegarde l'ordre
    if(this.photosToDelete.length > 0) {
      confirmSaveAndClose = window.confirm("Vous avez " + this.photosToDelete.length + " élément(s) prêt à être supprimé(s). " +
        "Etes-vous sûr de vouloir continuer ?")
      console.log("confirmation dialog")
      if (confirmSaveAndClose) {
        this.vehiculePhotoService.deleteVehiculePhotos(this.photosToDelete).pipe(() => {
          this.deleteListTemporaire();
          return this.save();
        }).subscribe(() => this.dialogRef.close(this.photos));

      }
    } else {
      new Observable().pipe(() => this.save()).subscribe(() => {
        this.sortAndClose(this.photos);
        this.dialogRef.close(this.photos);
      })

    }
  }

  /**
   * Sauvegarde de l'ordre des photos une par une
   */
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

    return scheduled(this.photos, asyncScheduler);
  }

  /**
   * Mise à jour de l'ordre des photos
   * @param photos
   */
  sortAndClose(photos: VehiculePhoto[]) {
    this.photos = photos.sort((a, b) => a.ordre && b.ordre ? a.ordre - b.ordre : 0);
  }

  /**
   * On supprime coté front les photos et on vient changer l'ordre de chacune des photos.
   */
  deleteListTemporaire() {
    let newListPhoto: VehiculePhoto[] = Object.assign(this.photos);
    this.photosToDelete.forEach((vehiculePhotoToDelete: VehiculePhoto) => {
      let vehiculePhotoFound = newListPhoto.findIndex(vehiculePhoto => vehiculePhoto.id = vehiculePhotoToDelete.id);
      if(vehiculePhotoFound != undefined) {
        newListPhoto.splice(vehiculePhotoFound,1);
      }
    })
    this.sortAndClose(newListPhoto);
    this.changeSortAfterDelete(newListPhoto);
  }

  /**
   * Lorsqu'on supprime des photos de la liste. la donnée ordre ne se met pas automatiquement à jour
   * (cad - si le Deuxième élément est supprimé alors le troisième à un ordre = à 3 mais devra être à 2 après la suppression)
   * @param vehiculePhotos
   */
  changeSortAfterDelete(vehiculePhotos: VehiculePhoto[]) {
    let index = 1;
    vehiculePhotos.forEach(vehiculePhotos => {
      vehiculePhotos.ordre = index;
      vehiculePhotos.deleted = false;
      index++;
    })
    this.photos = Object.assign(vehiculePhotos);
  }
}
