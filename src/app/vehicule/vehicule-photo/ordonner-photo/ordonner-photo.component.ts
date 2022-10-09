import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {CompactType, DisplayGrid, GridsterConfig, GridType} from 'angular-gridster2';
import {VehiculePhotoService} from 'src/app/api/services/vehiculePhoto.service';
import {VehiculePhoto} from "../../../api/models/vehiculePhoto";

@Component({
  selector: 'app-ordonner-photo',
  templateUrl: './ordonner-photo.component.html',
  styleUrls: ['./ordonner-photo.component.scss']
})
export class OrdonnerPhotoComponent implements OnInit, OnDestroy {

  constructor(private sanitizer: DomSanitizer, private vehiculePhotoService: VehiculePhotoService) {
  }

  @Input()
  vehiculeId: string = '';
  @Input()
  photos: any[] = [];

  @Output() changeImageList = new EventEmitter<any[]>();

  dropId!: string;

  photoListEnBase = new Map<string, number>();

  options: GridsterConfig = {
    draggable: {
      enabled: true
    },
    resizable: {
      enabled: false
    },
    minCols: 6,
    minRows: 1,
    fixedColWidth: 110,
    fixedRowHeight: 110,
    maxCols: 6,
    displayGrid: DisplayGrid.None,
    compactType: CompactType.CompactUpAndLeft,
    gridType: GridType.Fixed,
    setGridSize: true,
    useBodyForBreakpoint: true
  };

  ngOnInit(): void {
    //this.getPhotosVehicule(this.vehiculeId);
  }

  ngOnDestroy(): void {
    /*this.photos.forEach((photo) => {
      this.photoListEnBase.forEach((value, key) => {
        if (photo.ordre && photo.id == key && photo.ordre != value) {
          this.vehiculePhotoService.updateVehiculePhoto(key, photo.ordre).subscribe({})
        }
      })
    })*/
  }

/*  getPhotosVehicule(idVehicule: string) {
    this.vehiculePhotoService.getPhotoByIdVehicule(idVehicule).subscribe((photoById: any[]) => {

      photoById.forEach((photoId: any) => {
        this.photoListEnBase.set(photoId.id, photoId.ordre);
      })

      this.photos = photoById;
      this.photos = this.photos.sort((a, b) => a.ordre && b.ordre ? a.ordre - b.ordre : 0);
    })
  }*/

  checkChange(event: any) {
    if (event.itemComponent.drag.swap) {
      this.changeOrderPhotoAfterSwap(event.item.id, event.itemComponent.drag.swap.swapedItem.item.ordre, event.itemComponent.drag.swap.swapedItem.item.id, event.item.ordre)
    }
  }

  changeOrderPhotoAfterSwap(idItem1: string, newOrderItem1: number, idItem2: string, newOrderItem2: number) {
    if (this.photos) {
      this.updateItem(idItem1, newOrderItem1);
      this.updateItem(idItem2, newOrderItem2);
    }
  }

  updateItem(idItem: string, newOrderItem: number) {
    var itemPhoto = this.photos.find(value => value.id === idItem)
    if(itemPhoto) {
      var indexItemPhoto = this.photos.indexOf(itemPhoto);
      this.photos[indexItemPhoto].ordre = newOrderItem;
    }
  }
}
