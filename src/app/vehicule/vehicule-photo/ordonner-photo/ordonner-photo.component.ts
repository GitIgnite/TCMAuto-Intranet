import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import { CompactType, DisplayGrid, GridsterConfig, GridType } from 'angular-gridster2';

@Component({
  selector: 'app-ordonner-photo',
  templateUrl: './ordonner-photo.component.html',
  styleUrls: ['./ordonner-photo.component.scss']
})
export class OrdonnerPhotoComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer) { }

  @Input()
  public photos: any[] = [];

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
