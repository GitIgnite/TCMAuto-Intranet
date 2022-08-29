export class VehiculePhoto {
  id?: string;
  vehiculeId?: string;
  nom?: string;
  typeImage?: string;
  ordre?: number;

  constructor(id: string, vehiculeId: string, nom: string, typeImage: string, ordre: number) {
    this.id = id;
    this.vehiculeId = vehiculeId;
    this.nom = nom;
    this.typeImage = typeImage;
    this.ordre = ordre;
  }
}
