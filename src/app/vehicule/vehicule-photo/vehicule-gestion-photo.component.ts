import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {VehiculePhotoService} from "../../api/services/vehiculePhoto.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-vehicule-photo',
  templateUrl: './vehicule-gestion-photo.component.html',
  styleUrls: ['./vehicule-gestion-photo.component.scss']
})
export class VehiculeGestionPhotoComponent implements OnInit {

  public showPicture: boolean = true;
  public showOrderPicture: boolean = false;
  public showAddpicture: boolean = false;
  public image: any;
  public photos: any = [];
  public vehiculeId :string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private vehiculePhotoService: VehiculePhotoService) { }

  ngOnInit(): void {
    console.log("ouverture popup gestion photo")
    if(this.data && this.data.vehiculeId) {
      this.vehiculeId = this.data.vehiculeId;
      this.getPhotosVehicule(this.vehiculeId);
      // Recherche de la liste des images
      // Recherche de l'ordre des images
    }
  }

  getPhotosVehicule(idVehicule:string) {
    this.vehiculePhotoService.getPhotoByIdVehicule(idVehicule).subscribe(photos => {
      this.photos = photos;
    })
  }
  titreSelectionne(value: number) {
    this.showPicture = value == 1 ? true : false;
    this.showOrderPicture = value == 2 ? true : false;
    this.showAddpicture = value == 3 ? true : false;
  }

}
