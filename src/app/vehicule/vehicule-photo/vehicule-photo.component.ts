import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicule-photo',
  templateUrl: './vehicule-photo.component.html',
  styleUrls: ['./vehicule-photo.component.scss']
})
export class VehiculePhotoComponent implements OnInit {

  public showPicture: boolean = true;
  public showOrderPicture: boolean = false;
  public showAddpicture: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  titreSelectionne(value: number) {
    this.showPicture = value == 1 ? true : false;
    this.showOrderPicture = value == 2 ? true : false;
    this.showAddpicture = value == 3 ? true : false;
  }

}
