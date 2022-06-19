export class FileImage {

  file: File;
  vehiculeId: string;
  ordre: number;


  constructor(file: File, vehiculeId: string, ordre: number) {
    this.file = file;
    this.vehiculeId = vehiculeId;
    this.ordre = ordre;
  }
}
