export class Modele {
  id: string;
  libelle: string;
  marqueId: string;

  constructor(id: string, libelle: string, marqueId: string) {
    this.id = id;
    this.libelle = libelle;
    this.marqueId = marqueId;
  }
}
