import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import { CompactType, DisplayGrid, GridsterConfig, GridType } from 'angular-gridster2';
import { VehiculePhotoService } from 'src/app/api/services/vehiculePhoto.service';

@Component({
  selector: 'app-ordonner-photo',
  templateUrl: './ordonner-photo.component.html',
  styleUrls: ['./ordonner-photo.component.scss']
})
export class OrdonnerPhotoComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer, private vehiculePhotoService: VehiculePhotoService) { }

  photos: any[] = [];

  @Input()
  vehiculeId :string = '';

  dropId!: string;

  options: GridsterConfig = {
    draggable: {
      enabled: true
    },
    resizable: {
      enabled: false
    },
    minCols: 6,
    minRows:1,
    fixedColWidth:110,
    fixedRowHeight:110,
    maxCols: 6,
    displayGrid: DisplayGrid.None,
    compactType: CompactType.CompactUpAndLeft,
    gridType: GridType.Fixed,
    setGridSize: true,
    useBodyForBreakpoint: true
  };

  ngOnInit(): void {
    this.getPhotosVehicule(this.vehiculeId);
  }

  getPhotosVehicule(idVehicule:string) {
    this.vehiculePhotoService.getPhotoByIdVehicule(idVehicule).subscribe(photos => {
      this.photos = photos;
    })
  }

  displayImage(imageByteArray: any) {
    let objectURL = 'data:image/png;base64,' + imageByteArray;
    console.log("Test conversion des images")
    return this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }

  setDropId(dropId: string): void {
    this.dropId = dropId;
  }

}
