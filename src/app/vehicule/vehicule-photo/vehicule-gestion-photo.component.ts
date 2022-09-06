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

  public showOrderPicture: boolean = true;
  public showAddpicture: boolean = false;
  public image: any;
  public photos: any = [];
  public vehiculeId :string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private vehiculePhotoService: VehiculePhotoService) { }

  ngOnInit(): void {
    console.log("ouverture popup gestion photo")
    if(this.data && this.data.photos) {
      this.vehiculeId = this.data.vehiculeId;
      this.photos = this.data.photos;
    }
  }

  titreSelectionne(value: number) {
    this.showOrderPicture = value == 1 ? true : false;
    this.showAddpicture = value == 2 ? true : false;
  }

}
