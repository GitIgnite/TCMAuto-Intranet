import { Equipement } from "./Equipement";

export class GroupeEquipement {
  id: string;
  libelle: string;
  equipements?: Equipement[];

  constructor(id: string, libelle: string, equipement: Equipement[]) {
    this.id = id;
    this.libelle = libelle;
    this.equipements = equipement;
  }
}
