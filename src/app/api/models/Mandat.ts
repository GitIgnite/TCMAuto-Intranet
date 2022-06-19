import { Client } from "./Client";
import { Vehicule } from "./Vehicule";

export class Mandat {
  id?: string;
  acheteur?: Client;
  vehicule?: Vehicule;
  origineMandat?: string;
  dateSignature?: Date;
  lieuSignature?: string;
  kmEntreeMandat?: number;
  clientFacture?: string;
  garantie1?: string;
  dureeGarantie1?: string;
  garantie2?: string;


  constructor(id?: string, acheteur?: Client, vehicule?: Vehicule,  origineMandat?: string, dateSignature?: Date,
    lieuSignature?: string, kmEntreeMandat?: number, clientFacture?: string, garantie1?: string, dureeGarantie1?: string, garantie2?: string) {
    this.id = id;
    this.acheteur = acheteur;
    this.vehicule = vehicule;
    this.origineMandat = origineMandat;
    this.dateSignature = dateSignature;
    this.lieuSignature = lieuSignature;
    this.kmEntreeMandat = kmEntreeMandat;
    this.clientFacture = clientFacture;
    this.garantie1 = garantie1;
    this.garantie2 = garantie2;
    this.dureeGarantie1 = dureeGarantie1;
  }

}
