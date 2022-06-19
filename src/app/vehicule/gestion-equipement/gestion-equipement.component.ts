import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {VehiculeEquipement} from 'src/app/api/models/VehiculeEquipement';
import {VehiculeEquipementService} from 'src/app/api/services/vehiculeEquipement.service';
import {VariablesGlobales} from 'src/app/variablesGlobales';

@Component({
  selector: 'app-gestion-equipement',
  templateUrl: './gestion-equipement.component.html',
  styleUrls: ['./gestion-equipement.component.scss']
})
export class GestionEquipementComponent implements OnInit {

  public showEquipement: boolean = true;
  public showEquipementAdditionnel: boolean = false;
  vehiculeEquipementsChecked: VehiculeEquipement[] = [];
  listEquipementEnBase: VehiculeEquipement[] = [];

  constructor(public dialogRef: MatDialogRef<GestionEquipementComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private vehiculeEquipementService: VehiculeEquipementService, private variablesGlobales: VariablesGlobales) { }

  ngOnInit(): void {
    this.initDonneesVehiculeEquipement();
  }

  fermerEquipementDialog(): void {
    this.variablesGlobales.listEquipementchecked = [];
    this.variablesGlobales.alreadyToPass = false;
    this.dialogRef.close()
  }

  titreSelectionne(name: number) {
    this.showEquipement = name == 1;
    this.showEquipementAdditionnel = name == 2;
  }

  addVehiculeEquipementchecked(vehiculeEquipemements: VehiculeEquipement[]) {
    this.vehiculeEquipementsChecked = vehiculeEquipemements;
  }

  saveVehiculeEquipement() {
    this.addEquipementToVehicule(this.listEquipementEnBase, this.vehiculeEquipementsChecked);
    this.deleteEquipementToVehicule(this.listEquipementEnBase, this.vehiculeEquipementsChecked)
  }

  initDonneesVehiculeEquipement() {
    this.vehiculeEquipementService.getEquipementByVehiculeId(this.data.vehiculeCourrant.id).pipe().subscribe(vehiculeEquipement => {
      this.listEquipementEnBase = vehiculeEquipement;
    });
  }

  private addEquipementToVehicule(listeEquipementEnBase: VehiculeEquipement[], vehiculeEquipementsChecked: VehiculeEquipement[]) {
    vehiculeEquipementsChecked.forEach(equipementChecked => {
      let estPresentEnBase = false;
      listeEquipementEnBase.forEach(equipementBdd => {
        if(equipementBdd.equipement.id === equipementChecked.equipement.id) {
          estPresentEnBase = true;
        }
      })

      if(!estPresentEnBase) {
        this.vehiculeEquipementService.addEquipementByVehicule(equipementChecked).pipe().subscribe();
      }
    })
  }

  private deleteEquipementToVehicule(listeEquipementEnBase: VehiculeEquipement[], vehiculeEquipementsChecked: VehiculeEquipement[]){
    listeEquipementEnBase.forEach(equipementBdd => {
      let estretireDesEquipements = true;
      vehiculeEquipementsChecked.forEach(equipementChecked => {
        if(equipementBdd.equipement.id === equipementChecked.equipement.id) {
          estretireDesEquipements = false;
        }
      })

      if(estretireDesEquipements) {
        this.vehiculeEquipementService.deleteVehiculeEquipementByids(equipementBdd).pipe().subscribe();
      }
    })
  }

}
