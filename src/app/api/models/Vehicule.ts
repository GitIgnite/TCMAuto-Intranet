import { Client } from "./Client";
import { Marque } from "./Marque";
import { Modele } from "./Modele";
import {Categorie} from "./Categorie";
import {Energie} from "./Energie";
import {VehiculePhoto} from "./vehiculePhoto";

export class Vehicule {
  	id?: string;
    modele?: Modele;
    marque?: Marque;
    client?: Client;
    versionVehicule?: string;
    categorie?: Categorie;
    boiteVitesse?: string;
    nbVitesse?: number;
    contrat?: string;
    prixVente?: number;
    prixVenteMarche?: number;
    baremePrixIntermediation?: number;
    energie?: Energie;
    immatriculation?: string;
    numeroSerie?: string;
    dateMiseCirculation?: Date;
    kilometrage?: number;
    couleurInt?: string;
    couleurIntDetail?: string;
    couleurExt?: string;
    couleurExtDetail?: string;
    co2?: number;
    nbPorte?: number;
    nbMain?: number;
    pneu?: string;
    origine?: string;
    puissanceFiscale?: number;
    puissanceReel?: number;
    clientFacture?: string;
    nbPlace?: number;
    note?: string;
    enLigne?: boolean;
    vehiculePhotos?: VehiculePhoto[];


    constructor(id?: string, modele?: Modele, marque?: Marque, client?: Client, versionVehicule?: string, categorie?: Categorie,
      boiteVitesse?: string, nbVitesse?: number, contrat?: string, prixVente?: number, prixVenteMarche?: number,  baremePrixIntermediation?: number,
      energie?: Energie, immatriculation?: string, numeroSerie?: string, dateMiseCirculation?: Date, kilometrage?: number,
      couleurInt?: string, couleurIntDetail?: string, couleurExt?: string, couleurExtDetail?: string, co2?: number,
      nbPorte?: number, nbMain?: number, pneu?: string, origine?: string, puissanceFiscale?: number, puissanceReel?: number, clientFacture?: string, nbPlace?: number, note ?: string, enLigne ?: boolean) {
        this.id = id;
        this.modele = modele;
        this.marque = marque;
        this.client = client;
        this.versionVehicule = versionVehicule;
        this.categorie = categorie;
        this.boiteVitesse = boiteVitesse;
        this.nbVitesse = nbVitesse;
        this.contrat = contrat;
        this.prixVente = prixVente;
        this.prixVenteMarche = prixVenteMarche;
        this.baremePrixIntermediation = baremePrixIntermediation;
        this.energie = energie;
        this.immatriculation = immatriculation;
        this.numeroSerie = numeroSerie;
        this.dateMiseCirculation = dateMiseCirculation;
        this.kilometrage = kilometrage;
        this.couleurInt = couleurInt;
        this.couleurIntDetail = couleurIntDetail;
        this.couleurExt = couleurExt;
        this.couleurExtDetail = couleurExtDetail;
        this.co2 = co2;
        this.nbPorte = nbPorte;
        this.nbMain = nbMain;
        this.pneu = pneu;
        this.origine = origine;
        this.puissanceFiscale = puissanceFiscale;
        this.puissanceReel = puissanceReel;
        this.nbPlace = nbPlace;
        this.note = note;
        this.enLigne = enLigne;
    }
}
