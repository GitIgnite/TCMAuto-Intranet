import { Equipement } from "./Equipement";
import { Vehicule } from "./Vehicule";

export class VehiculeEquipement {
  id?: string;
  vehicule: Vehicule;
  equipement: Equipement;

  constructor(id: string, vehicule: Vehicule, equipement: Equipement) {
    this.id = id;
    this.vehicule = vehicule;
    this.equipement = equipement;
  }
}
