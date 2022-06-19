import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FileImage } from 'src/app/api/models/FileImage';
import { ImageService } from 'src/app/api/services/image.service';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-telechargement-photo',
  templateUrl: './telechargement-photo.component.html',
  styleUrls: ['./telechargement-photo.component.scss']
})
export class TelechargementPhotoComponent {

  selectedFiles?: FileList;
  currentFile?: File;
  fileImage!: FileImage
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;


  constructor(private imageService: ImageService){
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    console.log("Upload image !!!!")
    this.progress = 0;
    console.log("Uplaod file")
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.fileImage = new FileImage(this.currentFile, "", 1)
        this.fileImage.vehiculeId = ""
        this.imageService.upload(this.fileImage).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              //this.fileInfos = this.imageService.getFiles();
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
            this.currentFile = undefined;
          });
      }
      this.selectedFiles = undefined;
    }
  }
}
