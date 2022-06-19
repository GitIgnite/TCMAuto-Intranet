import { GroupeEquipement } from "./GroupeEquipement";

export class Equipement {
  id: string;
  libelle: string;
  groupeEquipement: GroupeEquipement;

  constructor(id: string, libelle: string, groupeEquipement: GroupeEquipement) {
    this.id = id;
    this.libelle = libelle;
    this.groupeEquipement = groupeEquipement;
  }
}
