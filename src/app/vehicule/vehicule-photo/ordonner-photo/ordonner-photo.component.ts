import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-ordonner-photo',
  templateUrl: './ordonner-photo.component.html',
  styleUrls: ['./ordonner-photo.component.scss']
})
export class OrdonnerPhotoComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer) { }

  @Input()
  public photos: any[] = [];
  
  ngOnInit(): void {
  }

  displayImage(imageByteArray: any) {
    let objectURL = 'data:image/png;base64,' + imageByteArray;
    console.log("Test conversion des images")
    return this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }

}
