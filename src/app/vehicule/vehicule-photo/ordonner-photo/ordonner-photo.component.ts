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
export class OrdonnerPhotoComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer, private vehiculePhotoService: VehiculePhotoService) {
  }

  @Input()
  vehiculeId: string = '';
  @Input()
  photos: any[] = [];
  photosDelete: any[] = [];

  @Output() changeImageList = new EventEmitter<any[]>();
  @Output() changeImagesToDelete = new EventEmitter<any[]>();

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
  }

  checkChange(event: any) {
    if (event.itemComponent.drag.swap && event.itemComponent.drag.swap.swapedItem) {
      this.changeOrderPhotoAfterSwap(event.item.id, event.itemComponent.drag.swap.swapedItem.item.ordre, event.itemComponent.drag.swap.swapedItem.item.id, event.item.ordre)
    }
  }

  /**
   *  Event de changement de l'ordre des vehiculePhoto
   * @param idItem1
   * @param newOrderItem1
   * @param idItem2
   * @param newOrderItem2
   */
  changeOrderPhotoAfterSwap(idItem1: string, newOrderItem1: number, idItem2: string, newOrderItem2: number) {
    if (this.photos) {
      this.updateItem(idItem1, newOrderItem1);
      this.updateItem(idItem2, newOrderItem2);
    }
  }

  /**
   * changement de l'ordre de l'item en cours de changement
   * @param idItem
   * @param newOrderItem
   */
  updateItem(idItem: string, newOrderItem: number) {
    var itemPhoto = this.photos.find(value => value.id === idItem)
    if(itemPhoto) {
      var indexItemPhoto = this.photos.indexOf(itemPhoto);
      this.photos[indexItemPhoto].ordre = newOrderItem;
    }
  }

  /**
   * Ajout des vehiculePhoto dans la liste prêt à être supprimé
   * @param img
   */
  addImageTodeleteList(img: VehiculePhoto) {
    img.deleted = !img.deleted;
    let photoFound = this.photosDelete.find(photo => photo.id == img.id);
    if(photoFound) {
      this.photosDelete.splice(photoFound,1);
    } else {
      this.photosDelete.push(img);
    }
    this.changeImagesToDelete.emit(this.photosDelete);
  }
}
