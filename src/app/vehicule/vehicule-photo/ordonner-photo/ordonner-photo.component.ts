import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import { CompactType, DisplayGrid, GridsterConfig, GridType } from 'angular-gridster2';
import { VehiculePhotoService } from 'src/app/api/services/vehiculePhoto.service';

@Component({
  selector: 'app-ordonner-photo',
  templateUrl: './ordonner-photo.component.html',
  styleUrls: ['./ordonner-photo.component.scss']
})
export class OrdonnerPhotoComponent implements OnInit, OnDestroy {

  constructor( private sanitizer: DomSanitizer, private vehiculePhotoService: VehiculePhotoService) { }

  @Input()
  vehiculeId :string = '';

  dropId!: string;
  photos: any[] = [];
  photoListEnBase = new Map<string, number>();

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

  ngOnDestroy(): void {
    this.photos.forEach((photo) => {
      this.photoListEnBase.forEach((value, key) => {
        if(photo.id == key && photo.ordre != value) {
          console.log("cette element doit être sauvegarder !!")
          this.vehiculePhotoService.updateVehicule(key, value)
        }
      })
     })
  }

  getPhotosVehicule(idVehicule:string) {
    this.vehiculePhotoService.getPhotoByIdVehicule(idVehicule).subscribe(photoById => {

      photoById.forEach((photoId: any) => {
        this.photoListEnBase.set(photoId.id ,photoId.ordre);
      })

      this.photos = photoById;
      this.photos = this.photos.sort((a,b) => a.ordre - b.ordre);
    })
  }

  displayImage(imageByteArray: any) {
    let objectURL = 'data:image/png;base64,' + imageByteArray;
    return this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }

  checkChange(event: any) {
    if(event.itemComponent.drag.swap) {
      this.changeOrderPhotoAfterSwap(event.item.id, event.itemComponent.drag.swap.swapedItem.item.ordre, event.itemComponent.drag.swap.swapedItem.item.id, event.item.ordre)
    }
  }

  changeOrderPhotoAfterSwap(idItem1: string, newOrderItem1: number, idItem2: string, newOrderItem2: number) {
    if(this.photos) {
      var itemPhoto1 = this.photos.find(value => value.id === idItem1)
      var indexItemPhoto1 = this.photos.indexOf(itemPhoto1);
      this.photos[indexItemPhoto1].ordre = newOrderItem1;

      var itemPhoto2 = this.photos.find(value => value.id === idItem2)
      var indexItemPhoto2 = this.photos.indexOf(itemPhoto2);
      this.photos[indexItemPhoto2].ordre = newOrderItem2;
    }
  }
}
