import {SafeUrl} from "@angular/platform-browser";

export class VehiculePhoto {
  data?: Blob[];
  id?: string;
  vehiculeId?: string;
  nom?: string;
  typeImage?: string;
  ordre?: number;
  url?: SafeUrl;

  constructor(data: Blob[], id: string, vehiculeId: string, nom: string, typeImage: string, ordre: number) {
    this.data = data;
    this.id = id;
    this.vehiculeId = vehiculeId;
    this.nom = nom;
    this.typeImage = typeImage;
    this.ordre = ordre;
  }
}
